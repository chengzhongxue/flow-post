<script setup lang="ts">
import type {Editor} from "@halo-dev/richtext-editor";
import { computed, type Component } from "vue";
import BubbleItemICardTitle from "@/editor/BubbleItemICardTitle.vue";
import FollowCardExtension from "@/editor/follow-card-edited";

const props = defineProps<{
  editor: Editor;
  isActive: ({ editor }: { editor: Editor }) => boolean;
  visible?: ({ editor }: { editor: Editor }) => boolean;
  icon?: Component;
  title?: string;
  action?: ({ editor }: { editor: Editor }) => void;
}>();

const titleText = computed({
  get: () => {
    return props.editor.getAttributes(FollowCardExtension.name).titleText;
  },
  set: (titleText: string) => {
    props.editor.chain().updateAttributes(FollowCardExtension.name, { titleText: titleText }).run();
  },
});

</script>

<template>
  <input
    v-model.lazy="titleText"
    placeholder="输入标题，按回车确认"
    class="bg-gray-50 rounded-md hover:bg-gray-100 block px-2 w-full py-1.5 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  />
</template>
