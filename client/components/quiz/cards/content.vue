<script setup lang="ts">
import { ElCard, ElRow, ElCol } from "element-plus";
import { Calendar, Document, Edit, View, Trophy } from "@element-plus/icons-vue";
import { defineProps } from "vue";
import type { Quiz } from "../../../interfaces/quiz";
import { findBestResult } from "../../../utils/quiz";

const { quiz, isPublic } = defineProps<{
  quiz: Quiz;
  isPublic?: boolean;
}>();

const quizLink = (id: string) => (isPublic ? `/quizzes/${id}` : `/user/quizzes/${id}`);

const bestResult = findBestResult(quiz);
</script>

<template>
  <NuxtLink :to="quizLink(quiz.id)">
    <el-card class="quiz-card" shadow="hover">
      <div class="quiz-card-content">
        <h2 class="quiz-name">{{ quiz.name }}</h2>

        <div class="quiz-info">
          <div v-if="!isPublic" class="info-item">
            <el-icon><Calendar /></el-icon>
            <span>{{ formatDate(quiz.createdAt) }}</span>
          </div>

          <div class="info-item">
            <el-icon><Document /></el-icon>
            <span>{{ quiz.questions.length }} questions</span>
          </div>

          <div v-if="isPublic">
            <div class="info-item">
              <el-icon><View /></el-icon>
              <span>{{ quiz.attempts.length }} attempts</span>
            </div>

            <div class="info-item">
              <el-icon><Trophy /></el-icon>
              <span v-if="bestResult"
                >@{{ bestResult?.user?.username }}, {{ bestResult?.result }}%</span
              >
              <span v-else>waiting...</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </NuxtLink>
</template>

<style scoped lang="scss">
.quiz-title {
  font-size: 28px;
  margin-bottom: 30px;
  color: var(--el-text-color-primary);
}

.quiz-card {
  margin-bottom: 10px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }

  .quiz-card-content {
    .quiz-name {
      font-size: 18px;
      margin: 0 0 10px 0;
      color: var(--el-text-color-primary);
    }

    .quiz-info {
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
