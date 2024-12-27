<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuizStore } from "../../../../stores/quiz";
import type { Quiz } from "../../../../interfaces/quiz";
// import Options from "../../../../pages/user/quizes/[id]/options/index.vue";

const route = useRoute();
const quizId = route.params.id;

const quizStore = useQuizStore();

const quiz: Quiz | undefined = quizStore?.quizes.find((quiz: any) => quiz.id === quizId);
</script>

<template>
  <div>
    <QuizPlayOptions />
    <Quiz v-if="quiz" :quiz="quiz" />
  </div>
</template>

<style scoped></style>
