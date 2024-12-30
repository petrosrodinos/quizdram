<script lang="ts" setup>
import { ref } from "vue";
import type { NewQuiz } from "../../interfaces/quiz";
import { QUIZ_QUESTION_SETTINGS } from "../../utils/constants";

const selectedOption = ref("ai");

const quizSettings = ref<NewQuiz>({
  prompt: "",
  questions: QUIZ_QUESTION_SETTINGS,
});

const handleOptionClick = (option: string) => {
  selectedOption.value = option;
};

const handlePromptSelected = (prompt: string) => {
  quizSettings.value = {
    ...quizSettings.value,
    prompt,
  };
};
</script>

<template>
  <div class="create-quiz-container">
    <!-- <el-tag key="test" type="primary" effect="dark" size="large" round>
      generate your own with AI
    </el-tag> -->
    <CreateQuizStep2 :option="selectedOption" @onPromptSelected="handlePromptSelected" />
    <CreateQuizStep1 @onOptionClick="handleOptionClick" />
  </div>
</template>

<style scoped>
.create-quiz-container {
  padding: 1rem;
  margin: 0 auto;
  max-width: 800px;
}

.step-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
