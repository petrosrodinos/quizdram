<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuizStore } from "../../../../stores/quiz";
import type { Quiz } from "../../../../interfaces/quiz";
import { useAuthStore } from "../../../../stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { getQuiz } from "../../../../services/quiz";

const route = useRoute();
const quizId = route.params.id;

const authStore = useAuthStore();
const quizStore = useQuizStore();

const isLoggedIn = !!authStore?.user;

const quiz: Quiz | undefined = quizStore?.quizes.find((quiz: Quiz) => quiz.id === quizId);

const { isLoading, data } = useQuery({
  queryKey: ["quiz", quizId as string],
  queryFn: () => getQuiz(quizId as string),
  enabled: !!authStore?.user && !!quizId,
});
</script>

<template>
  <div>
    <div v-if="isLoading">getting quiz...</div>

    <div v-if="(quiz || data) && !isLoading">
      <h2>{{ quiz?.name || data?.name }}</h2>
      <QuizPlayOptions v-if="isLoggedIn && data" :quiz="data" />
      <QuizPlayOptions v-if="!isLoggedIn && quiz" :quiz="quiz" />

      <QuizHistory v-if="data" :quiz="data" />
      <h2>questions</h2>
      <Quiz v-if="isLoggedIn && data" :quiz="data" :edit="true" />
      <Quiz v-if="!isLoggedIn && quiz" :quiz="quiz" :edit="true" />
    </div>
    <el-alert
      :closable="false"
      v-if="((isLoggedIn && !data) || (!isLoggedIn && !quiz)) && !isLoading"
      title="could not find quiz"
      type="error"
    />
  </div>
</template>

<style scoped>
.el-alert {
  margin-top: 20px;
}
</style>
