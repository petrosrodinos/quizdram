<script setup lang="ts">
import type { Quiz } from "../../../interfaces/quiz";
import { defineProps } from "vue";
import { Refresh, Share } from "@element-plus/icons-vue";

const { quiz, selectedAnswers } = defineProps<{
  quiz: Quiz;
  selectedAnswers: string[];
}>();

const calculateResult = () => {
  if (!quiz || selectedAnswers.length == 0) return;
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (calculateCorrect(question, selectedAnswers[index])) {
      score++;
    }
  });
  return (score / quiz.questions.length) * 100;
};

const calculateCorrect = (question: any, answer: any) => {
  if (question.type == "multiple") {
    return question.answers[Number(question.correct)] == answer;
  } else {
    return question.correct == answer;
  }
};

const handlePlayAgain = () => {};
</script>

<template>
  <div>
    <el-card>
      <h2>quiz finished</h2>
      <h3>your score: {{ calculateResult() }}%</h3>
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

<style scoped></style>
