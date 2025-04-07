<script setup lang="ts">
import {useRouteQuery} from "@vueuse/router";
import {computed, ref, watch} from "vue";
import {useQuery} from "@tanstack/vue-query";
import {
  VPageHeader,
  VCard,
  VLoading,
  VEmpty,
  VSpace,
  VButton,
  VPagination,
  IconRefreshLine, Dialog, Toast
} from "@halo-dev/components";
import {flowPostApiClient, flowPostCoreApiClient} from "@/api";
import FollowListItem from "@/components/FollowListItem.vue";
import MingcuteFollowLine from '~icons/mingcute/follow-line?width=1.2em&height=1.2em';
import type {Follow} from "@/api/generated";

const checkAll = ref(false);
const selectedFollow = ref<Follow>();
const selectedFollowNames = ref<string[]>([]);

const page = useRouteQuery<number>("page", 1, {
  transform: Number,
});
const size = useRouteQuery<number>("size", 20, {
  transform: Number,
});
const selectedSort = useRouteQuery<string | undefined>("sort");
const selectedStatus = useRouteQuery<string | undefined>("status");
const keyword = useRouteQuery<string>("keyword", "");
const total = ref(0);

watch(
  () => [
    selectedStatus.value,
    selectedSort.value,
    keyword.value,
  ],
  () => {
    page.value = 1;
  },
);

const handleClearFilters = () => {
  selectedStatus.value = undefined;
  selectedSort.value = undefined;
};

const hasFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedSort.value
  );
});

const {
  data: follows,
  isLoading,
  isFetching,
  refetch,
} = useQuery({
  queryKey: [
    "follows",
    page,
    size,
    keyword,
    selectedSort,
    selectedStatus,
  ],
  queryFn: async () => {

    const { data } = await flowPostApiClient.follow.listFollows({
      page: page.value,
      size: size.value,
      keyword: keyword.value,
      sort: [selectedSort.value].filter(Boolean) as string[],
      status: selectedStatus.value,
    });

    total.value = data.total;
    return data;
  },
  keepPreviousData: true,
  refetchInterval: (data) => {
    const hasDeletingFollow = data?.items.some(
      (follow) => follow?.metadata.deletionTimestamp,
    );
    return hasDeletingFollow ? 1000 : false;
  },
  onSuccess: (data) => {
    page.value = data.page;
    size.value = data.size;
  }
});

// Selection
const handleCheckAllChange = (e: Event) => {
  const { checked } = e.target as HTMLInputElement;

  if (checked) {
    selectedFollowNames.value =
      follows.value?.items.map((follow) => {
        return follow.metadata.name;
      }) || [];
  } else {
    selectedFollowNames.value = [];
  }
};

const checkSelection = (follow: Follow) => {
  return (
    follow.metadata.name === selectedFollow.value?.metadata.name || selectedFollowNames.value.includes(follow.metadata.name)
  );
};

watch(
  () => selectedFollowNames.value,
  (newValue) => {
    checkAll.value = newValue.length === follows.value?.items.length;
  }
);

const handleDeleteInBatch = async () => {
  Dialog.warning({
    title: '删除所选订阅用户',
    description: '将同时删除所有订阅用户，该操作不可恢复。',
    confirmType: "danger",
    confirmText: '确定',
    cancelText: '取消',
    onConfirm: async () => {
      try {
        const promises = selectedFollowNames.value.map((name) => {
          return flowPostCoreApiClient.follow.deleteFollow(
            {
              name: name
            }
          );
        });
        await Promise.all(promises);
        selectedFollowNames.value = [];

        Toast.success('删除成功');
      } catch (e) {
        console.error("Failed to delete follow", e);
      } finally {
        refetch();
      }
    },
  });
};

</script>
<template>
  <VPageHeader title="文章订阅">
    <template #icon>
      <MingcuteFollowLine class="mr-2 self-center" />
    </template>
  </VPageHeader>
  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0']">
      <template #header>
        <div class="block w-full bg-gray-50 px-4 py-3">
          <div
            class="relative flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center"
          >
            <div
              v-permission="['plugin:thyuu:comment:manage']"
              class="hidden items-center sm:flex"
            >
              <input
                v-model="checkAll"
                type="checkbox"
                @change="handleCheckAllChange"
              />
            </div>
            <div class="flex w-full flex-1 items-center sm:w-auto">
              <SearchInput
                v-if="!selectedFollowNames.length"
                v-model="keyword" />
              <VSpace v-else>
                <VButton type="danger" @click="handleDeleteInBatch">
                  删除
                </VButton>
              </VSpace>
            </div>
            <VSpace spacing="lg" class="flex-wrap">
              <FilterCleanButton
                v-if="hasFilters"
                @click="handleClearFilters"
              />
              <FilterDropdown
                v-model="selectedStatus"
                label="状态"
                :items="[
                  {
                    label: '全部',
                    value: undefined,
                  },
                  {
                    label: '确认',
                    value: 'confirm',
                  },
                  {
                    label: '取消',
                    value: 'cancel',
                  },
                  {
                    label: '等待',
                    value: 'pending',
                  },
        
                ]"
              />
              <FilterDropdown
                v-model="selectedSort"
                label="排序"
                :items="[
                  {
                    label: '默认',
                  },
                  {
                    label: '较近创建',
                    value: 'metadata.creationTimestamp,desc',
                  },
                  {
                    label: '较早创建',
                    value: 'metadata.creationTimestamp,asc',
                  },
                ]"
              />
              <div class="flex flex-row gap-2">
                <div
                  class="group cursor-pointer rounded p-1 hover:bg-gray-200"
                  @click="refetch()"
                >
                  <IconRefreshLine
                    v-tooltip="'刷新'"
                    :class="{ 'animate-spin text-gray-900': isFetching }"
                    class="h-4 w-4 text-gray-600 group-hover:text-gray-900"
                  />
                </div>
              </div>
            </VSpace>
          </div>
        </div>
      </template>
      <VLoading v-if="isLoading" />
      <Transition v-else-if="!follows?.items.length" appear name="fade">
        <VEmpty message="当前没有订阅用户，你可以尝试刷新" title="没有订阅用户">
          <template #actions>
            <VSpace>
              <VButton @click="refetch">
                刷新
              </VButton>
            </VSpace>
          </template>
        </VEmpty>
      </Transition>
      <Transition v-else appear name="fade">
        <ul
          class="box-border size-full divide-y divide-gray-100"
          role="list"
        >
          <li v-for="follow in follows?.items" :key="follow.metadata.name">
            <FollowListItem
              :follow="follow"
              :is-selected="checkSelection(follow)"
            >
              <template #checkbox>
                <input
                  v-model="selectedFollowNames"
                  :value="follow.metadata.name"
                  name="comment-checkbox"
                  type="checkbox"
                />
              </template>
            </FollowListItem>
          </li>
        </ul>
      </Transition>
      <template #footer>
        <VPagination
          v-model:page="page"
          v-model:size="size"
          page-label="页"
          size-label="条 / 页"
          :total-label="`共 ${total} 项数据`"
          :total="total"
          :size-options="[20, 30, 50, 100]"
        />
      </template>
    </VCard>
  </div>

</template>
