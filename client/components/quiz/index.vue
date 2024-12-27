<script lang="ts" setup>
import type { Quiz } from "../../interfaces/quiz";

const { quiz } = defineProps<{
  quiz: Quiz;
}>();
</script>

<template>
  <div>
    <div v-for="(question, index) in quiz.questions" :key="index">
      <QuizQuestion :question="question" />
    </div>
  </div>
</template>

<style scoped></style>
