<script lang="ts" setup>
import type {ListedPost} from "@halo-dev/api-client";
import {computed, toRefs} from "vue";
import {
  VEntityField,
} from "@halo-dev/components";
import MingcuteFollowLine from '~icons/mingcute/follow-line?width=1.2em&height=1.2em';

const props = withDefaults(
  defineProps<{
    post: ListedPost;
  }>(),
  {
  },
);

const {post} = toRefs(props);

const newPostNotified = computed( () => {
  return post.value.post.metadata.annotations?.["flow.post.kunkunyu.com/new-post-notified"];
  }
);

</script>

<template>
  <VEntityField v-if="newPostNotified" v-tooltip="'文章订阅：推送'">
    <template #description>
      <MingcuteFollowLine class="cursor-pointer text-sm" />
    </template>
  </VEntityField>
</template>
