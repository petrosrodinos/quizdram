<script lang="ts" setup>
import { ref } from "vue";
import type { NewQuiz } from "../../interfaces/quiz";
import { QUIZ_QUESTION_SETTINGS } from "../../utils/constants";
import { useQuizStore } from "../../stores/quiz";
import { navigateTo } from "nuxt/app";

const quizStore = useQuizStore();

const selectedOption = ref("ai");

const quizSettings = ref<NewQuiz>({
  prompt: "",
  questions: QUIZ_QUESTION_SETTINGS,
});

const handleOptionClick = (option: string) => {
  selectedOption.value = option;
};

const handlePromptSelected = async (prompt: string) => {
  const settings = {
    ...quizSettings.value,
    prompt,
  };
  quizStore.setQuizSettings(settings);
  await navigateTo("/create");
};
</script>

<template>
  <div class="create-quiz-container">
    <span>
      Generate personalized quizzes with AI in seconds! Share with friends and compete for the top
      spot—fun, fast, and interactive!
    </span>
    <CreateQuizStep2 :option="selectedOption" @onPromptSelected="handlePromptSelected" />
    <CreateQuizStep1 @onOptionClick="handleOptionClick" />
  </div>
</template>

<style scoped>
.create-quiz-container {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
}

span {
  font-size: 24px;
  font-weight: 400;
  margin: 20px;
  color: white;
  text-align: center;
  max-width: 750px;
}
</style>
