<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { createQuiz } from "../../../services/quiz";
import type { NewQuiz } from "../../../interfaces/quiz";
import { ref, watch, computed, onUnmounted } from "vue";
import { useQuizStore } from "../../../stores/quiz";

const { quizSettings } = defineProps<{
  quizSettings: NewQuiz;
}>();

const quizStore = useQuizStore();

const { isLoading, data, error } = useQuery({
  queryKey: ["new-quiz"],
  queryFn: () => createQuiz(quizSettings),
});

watch(data, (newData) => {
  if (newData) {
    quizStore.setQuiz(newData);
  }
});

const progressPercentage = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

watch(isLoading, (loading) => {
  if (loading) {
    progressPercentage.value = 0;
    timer = setInterval(() => {
      if (progressPercentage.value < 90) {
        progressPercentage.value += 10;
      }
    }, 500);
  } else {
    if (timer) clearInterval(timer);
    progressPercentage.value = data.value ? 100 : 0;
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const progressStatus: any = computed(() => {
  if (isLoading.value) {
    return "active";
  } else if (data.value) {
    return "success";
  } else if (error.value) {
    return "exception";
  }
  return "active";
});
</script>

<template>
  <div>
    <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="progressPercentage"
      :status="progressStatus"
    />
    <el-alert v-if="error" :title="error.message" type="error" />
    <p v-else-if="data">Quiz generated successfully</p>
    <p v-else-if="isLoading">Generating quiz...</p>
    <Quiz v-if="data" :quiz="data" />
  </div>
</template>

<style scoped></style>
