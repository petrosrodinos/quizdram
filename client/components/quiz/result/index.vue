<script setup lang="ts">
import type { Quiz } from "../../../interfaces/quiz";
import { defineProps } from "vue";
import { Refresh, Share } from "@element-plus/icons-vue";

const { quiz, selectedAnswers } = defineProps<{
  quiz: Quiz;
  selectedAnswers: string[];
}>();

const handlePlayAgain = () => {};
</script>

<template>
  <div>
    <el-card>
      <h2>quiz finished</h2>
      <h3>your score: {{ calculateResult(quiz, selectedAnswers) }}%</h3>
      <div>
        <el-button type="success" @click="handlePlayAgain" :icon="Refresh"> play Again </el-button>

        <el-button type="primary" :icon="Share"> share </el-button>
      </div>
    </el-card>
    <h2>your results</h2>
    <div v-for="(question, index) in quiz.questions" :key="index">
      <QuizQuestion
        :question="question"
        :answer="selectedAnswers[index]"
        :correct="calculateCorrect(question, selectedAnswers[index])"
        :disabled="true"
        :resultPage="true"
      />
    </div>
  </div>
</template>

<style scoped>
div {
  margin-top: 20px;
}
</style>
