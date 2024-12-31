<script setup lang="ts">
import type { NewQuiz } from "../../interfaces/quiz";
import { useQuizStore } from "../../stores/quiz";
import { ref, watch, onMounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { createQuiz } from "../../services/quiz";
import { useAuthStore } from "../../stores/auth";
import { navigateTo } from "nuxt/app";

const quizStore = useQuizStore();
const authStore = useAuthStore();

const quizSettings = ref<NewQuiz>(quizStore.quizSettings as NewQuiz);

const { isLoading, data, error } = useQuery({
  queryKey: ["new-quiz", quizSettings.value?.prompt],
  queryFn: () => createQuiz(quizSettings.value, authStore.user?.token),
  enabled: !!quizSettings && !!authStore.user,
  refetchOnWindowFocus: false,
});

onMounted(() => {
  if (!quizSettings.value) {
    navigateTo("/");
  }
});

watch(data, () => {
  if (data) {
    quizStore.setQuizSettings(undefined);
  }
});
</script>

<template>
  <div>
    <CreateQuizStep3 :data="data" :isLoading="isLoading" :error="error" />
  </div>
</template>

<style scoped></style>
