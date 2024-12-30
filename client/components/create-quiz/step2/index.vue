<script lang="ts" setup>
import { defineAsyncComponent, defineEmits, ref } from "vue";

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
    <!-- <el-button
      :disabled="!quizSettings.prompt"
      @click="handleCreateQuiz"
      type="success"
      :icon="Position"
      >create</el-button
    > -->
  </div>
</template>

<style scoped>
button {
  margin-top: 20px;
}
</style>
