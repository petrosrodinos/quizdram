<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getAttempt } from "../../../../../services/quiz";

const route = useRoute();

const quizId = route.params.id as string;
const attemptId = route.params.attemptId as string;

const { isLoading, data, error } = useQuery({
  queryKey: ["quiz-attempt", quizId, attemptId],
  queryFn: () => getAttempt(quizId, attemptId),
});
</script>

<template>
  <div>
    <QuizResult v-if="data" :quiz="data?.quiz" :attempt="data?.attempt" />
    <template v-else>
      <el-alert v-if="isLoading" title="loading..." type="info" />
      <el-alert v-else-if="error" title="error loading attempt" type="error" />
    </template>
  </div>
</template>

<style scoped>
template {
  margin-top: 20px;
}
</style>
