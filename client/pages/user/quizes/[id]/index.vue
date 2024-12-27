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
  <div v-if="quiz">
    <h2>{{ quiz?.name }}</h2>
    <QuizPlayOptions :quiz="quiz" />
    <QuizHistory :quiz="quiz" />
    <h2>Questions</h2>
    <Quiz :quiz="quiz" />
  </div>
  <el-alert :closable="false" v-else title="Could not find quiz" type="error" />
</template>

<style scoped></style>
