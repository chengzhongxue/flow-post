<script lang="ts" setup>
import type {NodeViewProps} from "@halo-dev/richtext-editor";
import { NodeViewWrapper } from "@halo-dev/richtext-editor";
import type { FollowCard } from '@kunkunyu/follow-card';
import {computed} from "vue";
const props = defineProps<NodeViewProps>();

const textAlign = computed({
  get: () => {
    return props.node?.attrs.textAlign;
  },
  set: (textAlign: string) => {
    props.updateAttributes({ textAlign: textAlign });
  },
});

const showTitle = computed(() => {
  return props.node.attrs.showTitle;
});

const titleText = computed({
  get: () => {
    return props.node?.attrs.titleText || '订阅最新内容推送';
  },
  set: (titleText: string) => {
    props.updateAttributes({ titleText: titleText });
  },
});
</script>

<template>
  <node-view-wrapper as="div" class="contact-follow-card-container"
                     :class="{
        'contact-follow-card-container--selected': selected,
      }">

    <div class="contact-follow-card-preview">
      <follow-card 
        :text-align="textAlign"
        :show-title="showTitle"
        :title-text="titleText" 
      />
    </div>
    
  </node-view-wrapper>
</template>

<style>
.contact-follow-card-container {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(229 231 235 / var(--tw-ring-opacity));
  border-radius: 4px;
  overflow: hidden;
  margin-top: .75em
}

.contact-follow-card-container--selected {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: inherit
}

.contact-follow-card-preview {
  padding: 5px 10px
}
</style>  
