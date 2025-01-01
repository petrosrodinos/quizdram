<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getAttempt } from "../../../../services/quiz";

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
    <div v-else>
      <div v-if="isLoading">getting attempt...</div>

      <el-alert :closable="false" v-else-if="error" title="error finding attempt" type="error" />
    </div>
  </div>
</template>

<style scoped>
div {
  margin-top: 20px;
}
</style>
