<script setup lang="ts">
import type { Quiz, QuizAttempt } from "../../../interfaces/quiz";
import { defineProps } from "vue";
import { Refresh, Share, Document, Timer } from "@element-plus/icons-vue";
import { navigateTo } from "nuxt/app";

const { quiz, attempt } = defineProps<{
  quiz: Quiz;
  attempt: QuizAttempt;
}>();

const handlePlayAgain = async () => {
  navigateTo(`/user/quizes/${quiz.id}/play`);
};
</script>

<template>
  <div>
    <h2>{{ quiz.name }}</h2>
    <el-card class="attempt-card" shadow="hover">
      <div class="attempt-card-content">
        <h3 class="attempt-name">{{ formatDate(attempt.createdAt) }}</h3>

        <div class="attempt-info">
          <div class="info-item">
            <el-icon><Document /></el-icon>
            <span>score: {{ calculateResult(quiz, attempt.selectedAnswers) }}%</span>
          </div>
          <div class="info-item">
            <el-icon><Timer /></el-icon>
            <span>time: {{ formatTime(attempt.time) }}m</span>
          </div>
        </div>
      </div>

      <div>
        <el-button type="success" @click="handlePlayAgain" :icon="Refresh"> play Again </el-button>

        <el-button type="primary" :icon="Share"> share </el-button>
      </div>
    </el-card>
    <h2>your results</h2>
    <div v-for="(question, index) in quiz.questions" :key="index">
      <QuizQuestion
        :question="question"
        :answer="attempt.selectedAnswers[index]"
        :correct="calculateCorrect(question, attempt.selectedAnswers[index])"
        :disabled="true"
        :resultPage="true"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  margin-top: 20px;
}

.attempt-card {
  margin-bottom: 20px;

  .attempt-card-content {
    .quiz-name {
      font-size: 18px;
      margin: 0 0 15px 0;
      color: var(--el-text-color-primary);
    }

    .attempt-info {
      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        color: var(--el-text-color-secondary);

        .el-icon {
          margin-right: 8px;
        }
      }
    }
  }
}

a {
  text-decoration: none;
}
</style>
