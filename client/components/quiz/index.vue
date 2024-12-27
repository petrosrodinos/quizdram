<script lang="ts" setup>
import type { Quiz } from "../../interfaces/quiz";

const { quiz, edit } = defineProps<{
  quiz: Quiz;
  edit?: boolean;
}>();
</script>

<template>
  <div>
    <div v-for="(question, index) in quiz.questions" :key="index">
      <QuizQuestion :question="question" :edit="edit" />
    </div>
  </div>
</template>

<style scoped></style>
