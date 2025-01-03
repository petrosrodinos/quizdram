<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { createAttempt, getQuiz } from "../../../../services/quiz";
import { navigateTo } from "nuxt/app";
import { useTimer } from "../../../../composables/useTimer";
import { useAuthStore } from "../../../../stores/auth";
import { useQuizGame } from "../../../../composables/useQuizGame";
import type { NewQuizAttempt } from "../../../../interfaces/quiz";
import { Timer } from "@element-plus/icons-vue";

definePageMeta({
  title: "Play Quiz",
  middleware: ["auth-user"],
});

const route = useRoute();
const quizId = route.params.id as string;

const authStore = useAuthStore();

const { isLoading, data: quiz } = useQuery({
  queryKey: ["quiz-play", quizId as string],
  queryFn: () => getQuiz(quizId as string),
  enabled: !!authStore?.user && !!quizId,
});

const { mutate } = useMutation({
  mutationFn: (data: NewQuizAttempt) => createAttempt(data, authStore?.user?.token as string),
});

const { timer, formattedTime, startTimer, resetTimer } = useTimer();

watchEffect(() => {
  if (quiz.value && !isLoading.value) {
    startTimer();
  }
});

const {
  currentQuestionIndex,
  currentQuestion,
  selectedAnswers,
  nextQuestion,
  previousQuestion,
  handleAnswerChange,
} = useQuizGame(quiz);

const handleNextClick = () => {
  if (!quiz?.value) return;
  if (currentQuestionIndex.value === quiz.value.questions.length - 1) {
    finishQuiz();
  } else {
    nextQuestion();
  }
};

const finishQuiz = () => {
  const newAttempt: NewQuizAttempt = {
    quizId: quizId,
    selectedAnswers: selectedAnswers.value,
    time: timer.value.toString(),
  };

  mutate(newAttempt, {
    onSuccess: async (data: any) => {
      resetTimer();
      navigateTo(`/quizzes/${quizId}/attempt/${data.attempts[data.attempts.length - 1]._id}`);
    },
  });
};
</script>

<template>
  <div>
    <UiSpinner v-if="isLoading" />
    <div v-if="quiz">
      <h1>{{ quiz.name }}</h1>
      <div>
        <h3>question {{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}</h3>

        <div class="info-item">
          <el-icon><Timer /></el-icon>
          <span>{{ formattedTime }}</span>
        </div>
        <div v-if="currentQuestion">
          <QuizQuestion
            :answer="selectedAnswers[currentQuestionIndex] || ''"
            @onAnswerChange="handleAnswerChange"
            :question="currentQuestion"
          />
        </div>

        <div class="navigation-buttons">
          <el-button
            type="warning"
            @click="previousQuestion"
            :disabled="currentQuestionIndex === 0"
          >
            previous
          </el-button>
          <el-button
            type="success"
            @click="handleNextClick"
            :disabled="!selectedAnswers[currentQuestionIndex]"
          >
            {{ currentQuestionIndex === quiz.questions.length - 1 ? "finish" : "next" }}
          </el-button>
        </div>
      </div>
    </div>

    <el-alert
      :closable="false"
      v-else-if="!quiz && !isLoading"
      title="you cannot access this page."
      type="warning"
    />
  </div>
</template>

<style lang="scss" scoped>
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.el-alert {
  margin-top: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: var(--el-text-color-secondary);
}
</style>
