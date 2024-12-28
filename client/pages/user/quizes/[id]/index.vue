<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuizStore } from "../../../../stores/quiz";
import type { Quiz } from "../../../../interfaces/quiz";
import { useAuthStore } from "../../../../stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { getQuiz } from "../../../../services/quiz";
import { watch } from "vue";

const route = useRoute();
const quizId = route.params.id;

const authStore = useAuthStore();
const quizStore = useQuizStore();

const quiz: Quiz | undefined = quizStore?.quizes.find((quiz: Quiz) => quiz.id === quizId);

const { isLoading, data } = useQuery({
  queryKey: ["quizes", quizId as string],
  queryFn: () => getQuiz(quizId as string),
  enabled: !!authStore?.user && !!quizId,
});
</script>

<template>
  <div>
    <div v-if="isLoading">getting quiz...</div>
    <div v-if="(quiz || data) && !isLoading">
      <h2>{{ quiz?.name }}</h2>
      <QuizPlayOptions v-if="authStore.user && data" :quiz="data" />
      <QuizPlayOptions v-if="!authStore.user && quiz" :quiz="quiz" />

      <QuizHistory v-if="data" :quiz="data" />
      <h2>questions</h2>
      <Quiz v-if="authStore.user && data" :quiz="data" :edit="true" />
      <Quiz v-if="!authStore.user && quiz" :quiz="quiz" :edit="true" />
    </div>
    <el-alert
      :closable="false"
      v-if="!isLoading && (!data || !quiz)"
      title="Could not find quiz"
      type="error"
    />
  </div>
</template>

<style scoped>
.el-alert {
  margin-top: 20px;
}
</style>
