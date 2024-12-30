<script lang="ts" setup>
import { ref } from "vue";
import type { NewQuiz } from "../../interfaces/quiz";

const step = ref(0);
const selectedOption = ref("");
const quizSettings = ref({});

const handleCreateQuiz = (settings: NewQuiz) => {
  quizSettings.value = {
    ...quizSettings.value,
    ...settings,
  };
};
</script>

<template>
  <div class="create-quiz-container">
    <h1>oups</h1>
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
