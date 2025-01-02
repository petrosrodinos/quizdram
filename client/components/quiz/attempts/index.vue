<script setup lang="ts">
import type { Quiz } from "../../../interfaces/quiz";
import { useAuthStore } from "../../../stores/auth";
import { Timer, Document, Calendar, User } from "@element-plus/icons-vue";

const authStore = useAuthStore();

const { quiz, isPublic } = defineProps<{
  quiz: Quiz;
  isPublic?: boolean;
}>();
</script>

<template>
  <div>
    <h2>attempts</h2>
    <el-row v-if="quiz.attempts?.length > 0" :gutter="20">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="12"
        v-for="attempt in quiz.attempts"
        :key="attempt._id"
      >
        <NuxtLink
          :to="isPublic ? undefined : { path: `/quizzes/${quiz.id}/attempt/${attempt._id}` }"
          :tag="isPublic ? 'span' : 'a'"
          :class="{ disabled: isPublic }"
        >
          <el-card class="attempt-card" shadow="hover">
            <div class="attempt-card-content">
              <h3 class="attempt-name">{{ formatDate(attempt.createdAt) }}</h3>

              <div class="attempt-info">
                <div class="info-item">
                  <el-icon><Document /></el-icon>
                  <span>{{ calculateResult(quiz, attempt.selectedAnswers) }}%</span>
                </div>
                <div class="info-item">
                  <el-icon><Timer /></el-icon>
                  <span>{{ formatTime(attempt.time) }}m</span>
                </div>
                <div v-if="isPublic" class="info-item">
                  <el-icon><User /></el-icon>
                  <span>@{{ attempt.userId.username }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </NuxtLink>
      </el-col>
    </el-row>
    <el-alert
      v-if="!authStore.user"
      :closable="false"
      effect="dark"
      title="create an account to start logging your attempts."
      type="warning"
    />
    <el-alert
      v-else-if="authStore.user && quiz.attempts.length == 0"
      :closable="false"
      effect="dark"
      title="there are no attempts for this quiz."
      type="warning"
    />
  </div>
</template>

<style lang="scss" scoped>
.attempt-card {
  margin-bottom: 20px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }

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

.disabled {
  pointer-events: none;
}

a {
  text-decoration: none;
}
</style>
