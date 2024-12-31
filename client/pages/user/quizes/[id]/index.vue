<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "../../../../stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { getQuiz } from "../../../../services/quiz";

const route = useRoute();
const quizId = route.params.id;

const authStore = useAuthStore();

const { isLoading, data } = useQuery({
  queryKey: ["quiz", quizId as string],
  queryFn: () => getQuiz(quizId as string),
  enabled: !!authStore?.user && !!quizId,
});
</script>

<template>
  <div class="quiz-container">
    <div v-if="isLoading">getting quiz...</div>

    <div v-if="data && !isLoading">
      <h2>{{ data?.name }}</h2>
      <QuizPlayOptions :quiz="data" />

      <QuizHistory :quiz="data" />
      <br />
      <h2>questions</h2>
      <Quiz :quiz="data" :edit="true" />
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
