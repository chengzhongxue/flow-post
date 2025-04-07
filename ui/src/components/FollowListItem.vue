<script lang="ts" setup>
import { formatDatetime } from "@/utils/date";
import {
  VEntity,
  VEntityField,
  VStatusDot,
  VDropdownItem, 
  Dialog, 
  Toast,
} from "@halo-dev/components";
import {type Follow, FollowStatusEnum} from "@/api/generated";
import {flowPostApiClient, flowPostCoreApiClient} from "@/api";
import {useQueryClient} from "@tanstack/vue-query";

const props = withDefaults(
  defineProps<{
    follow: Follow;
    isSelected?: boolean;
  }>(),
  {
    isSelected: false,
  },
);

const queryClient = useQueryClient();

const handleDelete = async () => {
  Dialog.warning({
    title: "确定要删除该订阅用户吗？",
    description: "删除之后将无法恢复。",
    confirmType: "danger",
    confirmText: "确定",
    cancelText: "取消",
    onConfirm: async () => {
      try {
        await flowPostCoreApiClient.follow.deleteFollow({
          name: props.follow.metadata.name as string
        })
        Toast.success("删除成功");
      } catch (error) {
        console.error("Failed to delete follow",error);
      } finally {
        queryClient.invalidateQueries({ queryKey: ["follows"] });
      }
    },
  });
};


const handleConfirm = async () => {
  Dialog.warning({
    title: "确定要订阅吗？",
    confirmText: "确定",
    cancelText: "取消",
    onConfirm: async () => {
      try {
        await flowPostApiClient.follow.confirmFollow({
          name: props.follow.metadata.name as string,
          token: props.follow.token
        })
        Toast.success("订阅成功");
      } catch (error) {
        console.error("Failed to confirm follow",error);
      } finally {
        queryClient.invalidateQueries({ queryKey: ["follows"] });
      }
    },
  });
};

const handleCancel = async () => {
  Dialog.warning({
    title: "确定要取消订阅吗？",
    confirmText: "确定",
    cancelText: "取消",
    onConfirm: async () => {
      try {
        await flowPostApiClient.follow.cancelFollow({
          name: props.follow.metadata.name as string,
          token: props.follow.token
        })
        Toast.success("取消订阅成功");
      } catch (error) {
        console.error("Failed to cancel follow",error);
      } finally {
        queryClient.invalidateQueries({ queryKey: ["follows"] });
      }
    },
  });
};

const state = (status:string) =>{
  if (status == FollowStatusEnum.Confirm) {
    return 'success';
  }
  if (status == FollowStatusEnum.Cancel) {
    return 'default';
  }
  return 'warning';
}


const statusText = (status:string) =>{
  if (status == FollowStatusEnum.Confirm) {
    return '确认';
  }
  if (status == FollowStatusEnum.Cancel) {
    return '取消';
  }
  return '等待';
}

</script>
<template>
  <VEntity :is-selected="isSelected">
    <template #checkbox>
      <HasPermission :permissions="['plugin:flow:post:follow:manage']">
        <slot name="checkbox" />
      </HasPermission>
    </template>
    <template #start>
      <VEntityField
        :title="follow.metadata.name"
        :description="follow.email"
      >
      </VEntityField>
    </template>
    <template #end>
      <VEntityField
      >
        <template #description>
          <VStatusDot
            :state="state(follow.status)"
            :animate="follow.status === FollowStatusEnum.Confirm"
            :text="statusText(follow.status)"
          />
        </template>
      </VEntityField>
      <VEntityField v-if="follow.metadata.deletionTimestamp">
        <template #description>
          <VStatusDot
            v-tooltip="'删除中'"
            state="warning"
            text="删除中"
          />
        </template>
      </VEntityField>
      <VEntityField>
        <template #description>
          <span class="truncate text-xs tabular-nums text-gray-500">
            {{ formatDatetime(follow.metadata.creationTimestamp) }}
          </span>
        </template>
      </VEntityField>
    </template>
    <template #dropdownItems>
      <HasPermission :permissions="['plugin:flow:post:follow:manage']">
        <VDropdownItem @click="handleConfirm" v-if="follow.status !== FollowStatusEnum.Confirm">
          订阅
        </VDropdownItem>
        <VDropdownItem @click="handleCancel" v-if="follow.status === FollowStatusEnum.Confirm">
          取消订阅
        </VDropdownItem>
        <VDropdownItem type="danger" @click="handleDelete">
          删除
        </VDropdownItem>
      </HasPermission>
    </template>
  </VEntity>
</template>
