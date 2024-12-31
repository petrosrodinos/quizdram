<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { createQuiz } from "../../../services/quiz";
import type { NewQuiz } from "../../../interfaces/quiz";
import { useAuthStore } from "../../../stores/auth";

const { quizSettings } = defineProps<{
  quizSettings: NewQuiz;
}>();

const authStore = useAuthStore();

const { isLoading, data, error } = useQuery({
  queryKey: ["new-quiz", quizSettings.prompt],
  queryFn: () => createQuiz(quizSettings, authStore.user?.token),
  enabled: !!quizSettings && !!authStore.user,
  retry: 1,
});
</script>

<template>
  <div>
    <h2 v-if="data">quiz generated successfully</h2>
    <Quiz v-if="data" :quiz="data" :edit="true" />
    <el-alert v-if="(error || !data) && !isLoading" title="could not generate quiz" type="error" />
    <p v-else-if="isLoading">generating quiz...</p>
  </div>
</template>

<style scoped>
div {
  margin-top: 20px;
}
</style>
