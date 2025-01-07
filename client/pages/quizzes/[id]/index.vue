<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { useQuiz } from "../../../composables/api/useQuiz";

const route = useRoute();
const quizId = route.params.id;

const { getQuiz } = useQuiz();

const { isLoading, data } = useQuery({
  queryKey: ["quiz", quizId as string],
  queryFn: () => getQuiz(quizId as string),
});
</script>

<template>
  <div class="quiz-container">
    <UiSpinner v-if="isLoading" />

    <div v-if="data && !isLoading">
      <h2>{{ data?.name }}</h2>
      <QuizPlayOptions :quiz="data" />

      <QuizAttempts :quiz="data" :isPublic="true" />
    </div>
    <el-alert
      :closable="false"
      v-if="!data && !isLoading"
      title="could not find quiz"
      type="error"
    />
  </div>
</template>

<style scoped>
div {
  padding-top: 5px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
