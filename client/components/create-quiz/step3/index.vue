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
  queryKey: ["new-quiz"],
  queryFn: () => createQuiz(quizSettings, authStore.user?.token),
  enabled: !!quizSettings,
  retry: 1,
});
</script>

<template>
  <div>
    <el-alert v-if="error || !data" title="could not generate quiz" type="error" />
    <h2 v-else-if="data">quiz generated successfully</h2>
    <p v-else-if="isLoading">generating quiz...</p>
    <Quiz v-if="data" :quiz="data" :edit="true" />
  </div>
</template>

<style scoped>
div {
  margin-top: 20px;
}
</style>
