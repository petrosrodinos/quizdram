<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "../../../../stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { getQuiz } from "../../../../services/quiz";

const route = useRoute();
const quizId = route.params.id;

const authStore = useAuthStore();

const isLoggedIn = !!authStore?.user;

const { isLoading, data } = useQuery({
  queryKey: ["quiz", quizId as string],
  queryFn: () => getQuiz(quizId as string),
  enabled: !!authStore?.user && !!quizId,
});
</script>

<template>
  <div>
    <div v-if="isLoading">getting quiz...</div>

    <div v-if="data && !isLoading">
      <h2>{{ data?.name }}</h2>
      <QuizPlayOptions :quiz="data" />

      <QuizHistory :quiz="data" />
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
  margin-top: 20px;
}
</style>
