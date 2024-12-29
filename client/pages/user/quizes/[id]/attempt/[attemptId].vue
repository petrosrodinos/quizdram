<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { navigateTo } from "nuxt/app";
import type { Quiz } from "../../../../../interfaces/quiz";

const route = useRoute();
const quiz: Quiz = JSON.parse((route.query.quiz as string) || "{}");
const selectedAnswers: string[] = JSON.parse((route.query.selectedAnswers as string) || "[]");

onMounted(async () => {
  if (Object.keys(quiz).length == 0 || selectedAnswers.length == 0) {
    await navigateTo("/user/quizes");
  }
});
</script>

<template>
  <QuizResult :quiz="quiz" :selectedAnswers="selectedAnswers" />
</template>

<style scoped>
template {
  margin-top: 20px;
}
</style>
