<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuizStore } from "../../../../stores/quiz";
import type { Quiz } from "../../../../interfaces/quiz";

const route = useRoute();
const quizId = route.params.id;

const quizStore = useQuizStore();

const quiz: Quiz | undefined = quizStore?.quizes.find((quiz: Quiz) => quiz.id === quizId);
</script>

<template>
  <div>
    <QuizPlayOptions v-if="quiz" :quiz="quiz" />
    <Quiz v-if="quiz" :quiz="quiz" />
    <el-alert v-else title="Could not find quiz" type="error" />
  </div>
</template>

<style scoped></style>
