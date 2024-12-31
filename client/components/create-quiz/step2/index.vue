<script lang="ts" setup>
import { defineAsyncComponent, defineEmits } from "vue";

const { option } = defineProps<{
  option: string;
}>();

const emit = defineEmits(["onPromptSelected"]);

const options: any = {
  doc: defineAsyncComponent(() => import("./doc.vue")),
  ai: defineAsyncComponent(() => import("./ai.vue")),
  text: defineAsyncComponent(() => import("./text.vue")),
  video: defineAsyncComponent(() => import("./video.vue")),
};

const handlePromptSelected = (prompt: string) => {
  emit("onPromptSelected", prompt);
};
</script>

<template>
  <div>
    <component @onPromptSelected="handlePromptSelected" :is="options[option]" />
  </div>
</template>

<style scoped>
div {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
