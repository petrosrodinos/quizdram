<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "../../../../stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { useQuiz } from "../../../../composables/api/useQuiz";

const route = useRoute();
const quizId = route.params.id;

const authStore = useAuthStore();

const { getQuiz } = useQuiz();

const { isLoading, data } = useQuery({
  queryKey: ["quiz", quizId as string],
  queryFn: () => getQuiz(quizId as string, { userId: authStore?.user?.id as string }),
  enabled: !!authStore?.user && !!quizId,
});

definePageMeta({
  title: `Quiz`,
  middleware: ["auth-user"],
});
</script>

<template>
  <div class="quiz-container">
    <UiSpinner v-if="isLoading" />

    <div v-if="data && !isLoading">
      <h2>{{ data?.name }}</h2>
      <QuizPlayOptions :quiz="data" />

      <QuizAttempts :quiz="data" />
      <div v-if="data.userId._id === authStore?.user?.id">
        <h2>questions</h2>
        <Quiz :quiz="data" :edit="true" />
      </div>
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
