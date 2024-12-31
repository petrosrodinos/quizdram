<script setup lang="ts">
import type { NewQuiz } from "../../interfaces/quiz";
import { useQuizStore } from "../../stores/quiz";
import { ref } from "vue";

const quizStore = useQuizStore();

const quizSettings = ref<NewQuiz>(quizStore.quizSettings as NewQuiz);
</script>

<template>
  <div>
    <CreateQuizStep3 :quizSettings="quizSettings" />
  </div>
</template>

<style scoped></style>
