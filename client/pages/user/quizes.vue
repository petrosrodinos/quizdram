<script setup>
import { useQuizStore } from "../../stores/quiz";
import { ElCard, ElRow, ElCol } from "element-plus";
import { Calendar, Document } from "@element-plus/icons-vue";
import { ref } from "vue";

const quizStore = useQuizStore();
const quizes = ref(quizStore?.quizes);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="quiz-container">
    <h1 class="quiz-title">Your Quizes</h1>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="quiz in quizes" :key="quiz.id">
        <el-card class="quiz-card" shadow="hover">
          <div class="quiz-card-content">
            <h2 class="quiz-name">{{ quiz.name }}</h2>

            <div class="quiz-info">
              <div class="info-item">
                <el-icon><Calendar /></el-icon>
                <span>{{ formatDate(quiz.createdAt) }}</span>
              </div>

              <div class="info-item">
                <el-icon><Document /></el-icon>
                <span>{{ quiz.questions.length }} Questions</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.quiz-container {
  padding: 20px;

  .quiz-title {
    font-size: 28px;
    margin-bottom: 30px;
    color: var(--el-text-color-primary);
  }

  .quiz-card {
    margin-bottom: 20px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      cursor: pointer;
    }

    .quiz-card-content {
      .quiz-name {
        font-size: 18px;
        margin: 0 0 15px 0;
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
}
</style>
