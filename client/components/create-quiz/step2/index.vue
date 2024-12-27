<script lang="ts" setup>
import { defineAsyncComponent, defineEmits, ref } from "vue";
import { QUIZ_QUESTION_SETTINGS } from "../../../utils/constants";
import { Position } from "@element-plus/icons-vue";

const { option } = defineProps<{
  option: string;
}>();

const emit = defineEmits(["onCreateQuiz"]);

const quizSettings = ref({
  prompt: "",
  questions: QUIZ_QUESTION_SETTINGS,
});

const options: any = {
  doc: defineAsyncComponent(() => import("./doc.vue")),
  ai: defineAsyncComponent(() => import("./ai.vue")),
  text: defineAsyncComponent(() => import("./text.vue")),
  video: defineAsyncComponent(() => import("./video.vue")),
};

const handlePromptChange = (prompt: string) => {
  quizSettings.value = {
    ...quizSettings.value,
    prompt,
  };
};

const handleCreateQuiz = () => {
  emit("onCreateQuiz", quizSettings.value);
};
</script>

<template>
  <div>
    <component @onPromptChange="handlePromptChange" :is="options[option]" />
    <el-button
      :disabled="!quizSettings.prompt"
      type="success"
      @click="handleCreateQuiz"
      :icon="Position"
      >Create</el-button
    >
  </div>
</template>

<style scoped>
button {
  margin-top: 20px;
}
</style>
