<script lang="ts" setup>
import { defineAsyncComponent, defineEmits } from "vue";
import type { NewQuiz } from "../../../interfaces/quiz";

defineProps<{
  option: string;
}>();

const emit = defineEmits(["onSettingsSelect"]);

const options: any = {
  doc: defineAsyncComponent(() => import("./doc.vue")),
  ai: defineAsyncComponent(() => import("./ai.vue")),
  text: defineAsyncComponent(() => import("./text.vue")),
  video: defineAsyncComponent(() => import("./video.vue")),
};

const handleSettingsSelect = (value: NewQuiz) => {
  emit("onSettingsSelect", value);
};
</script>

<template>
  <div>
    <component @onSettingsSelect="handleSettingsSelect" :is="options[option]" />
  </div>
</template>

<style scoped></style>
