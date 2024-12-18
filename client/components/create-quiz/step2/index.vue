<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

defineProps<{
  option: string;
}>();

const options: any = {
  custom: defineAsyncComponent(() => import("./custom.vue")),
  ai: defineAsyncComponent(() => import("./ai.vue")),
  text: defineAsyncComponent(() => import("./text.vue")),
  video: defineAsyncComponent(() => import("./video.vue")),
};
</script>

<template>
  <div>
    <component :is="options[option]" />
    <!-- <h2><CreateQuizStep2Ai /></h2> -->
  </div>
</template>

<style scoped></style>
