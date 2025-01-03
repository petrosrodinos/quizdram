<script lang="ts" setup>
import { ref, h } from "vue";
import type { NewQuiz, Quiz } from "../../interfaces/quiz";
import { QUIZ_QUESTION_SETTINGS } from "../../utils/constants";
import { useQuizStore } from "../../stores/quiz";
import { useAuthStore } from "../../stores/auth";
import { navigateTo } from "nuxt/app";
import { ElMessageBox, ElNotification } from "element-plus";
import { useMutation } from "@tanstack/vue-query";
import { createQuiz } from "../../services/quiz";
import { ElMessage } from "element-plus";

const quizStore = useQuizStore();
const authStore = useAuthStore();

const selectedOption = ref("ai");

const { mutate, isPending } = useMutation({
  mutationFn: (data: NewQuiz) => createQuiz(data, authStore.user?.token),
  onSuccess: async (data: Quiz) => {
    authStore.updateUser({
      tokens: data.remainingTokens,
    });
    showRemainingTokensMessage();
    navigateTo(`/user/quizzes/${data.id}`);
  },
  onError: (error) => {
    ElMessage({
      message: error.message,
      type: "error",
    });
  },
});

const handleOptionClick = (option: string) => {
  selectedOption.value = option;
};

const handlePromptSelected = async (prompt: string) => {
  const settings: NewQuiz = {
    prompt,
    questions: QUIZ_QUESTION_SETTINGS,
  };
  quizStore.setQuizSettings(settings);
  if (!authStore.user) {
    showLoginDialog();
  } else {
    mutate(settings);
  }
};

const showLoginDialog = () => {
  ElMessageBox({
    title: "please login to continue",
    message: h("p", null, [
      h("span", null, "you need to "),
      h("i", { style: "color: teal" }, "login"),
      h("span", null, " to access this feature."),
    ]),
    confirmButtonText: "login",
    cancelButtonText: "cancel",
    type: "warning",
  }).then(() => {
    navigateTo("/auth/signup?redirect=/");
  });
};

const showRemainingTokensMessage = () => {
  ElNotification({
    title: "quiz created",
    message: `you have ${authStore.user?.tokens} tokens remaining`,
    type: "success",
  });
};
</script>

<template>
  <div class="create-quiz-container">
    <slot />
    <UiSpinner v-if="isPending" />
    <div v-if="!isPending">
      <CreateQuizPrompt :option="selectedOption" @onPromptSelected="handlePromptSelected" />
      <CreateQuizOptions @onOptionClick="handleOptionClick" />
    </div>
  </div>
</template>

<style scoped>
.create-quiz-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
}
</style>
