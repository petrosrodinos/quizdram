<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { NewQuizAttempt, Question, Quiz } from "../../../../../interfaces/quiz";
import { useAuthStore } from "../../../../../stores/auth";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { createAttempt, getQuiz } from "../../../../../services/quiz";
import { navigateTo } from "nuxt/app";
import { useTimer } from "../../../../../composables/useTimer";

const route = useRoute();
const quizId = route.params.id as string;

const authStore = useAuthStore();

const quiz = ref<Quiz | null>(null);
const currentQuestion = ref<Question | null>(null);

const currentQuestionIndex = ref(0);

const selectedAnswers = ref<string[]>([]);

const { timer, formattedTime, startTimer, resetTimer } = useTimer();

const { isLoading, data } = useQuery({
  queryKey: ["quizz", quizId as string],
  queryFn: () => getQuiz(quizId as string),
  enabled: !!authStore?.user && !!quizId,
});

const { mutate } = useMutation({
  mutationFn: (data: NewQuizAttempt) => createAttempt(data, authStore?.user?.token as string),
});

watch(data, () => {
  if (!data.value) return;
  quiz.value = data.value;
  currentQuestion.value = data.value.questions[currentQuestionIndex.value];
  startTimer();
});

const nextQuestion = () => {
  if (!quiz.value) return;
  if (currentQuestionIndex.value < quiz.value.questions.length - 1) {
    currentQuestionIndex.value++;
  } else if (currentQuestionIndex.value === quiz.value.questions.length - 1) {
    if (authStore?.user) {
      const newAttempt: NewQuizAttempt = {
        quizId: quizId,
        selectedAnswers: selectedAnswers.value,
        time: timer.value.toString(),
      };
      mutate(newAttempt, {
        onSuccess: async (data: any) => {
          resetTimer();
          navigateTo(
            `/user/quizes/${quizId}/attempt/${data.attempts[data.attempts.length - 1]._id}`
          );
        },
      });
    }
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const handleAnswerChange = (answer: string) => {
  selectedAnswers.value = [
    ...selectedAnswers.value.slice(0, currentQuestionIndex.value),
    answer,
    ...selectedAnswers.value.slice(currentQuestionIndex.value + 1),
  ];
};
</script>

<template>
  <div v-if="quiz">
    <h1>{{ quiz.name }}</h1>
    <div>
      <h3>question {{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}</h3>
      <p>time: {{ formattedTime }}</p>
      <div v-if="currentQuestion">
        <QuizQuestion
          :answer="selectedAnswers[currentQuestionIndex] || ''"
          @onAnswerChange="handleAnswerChange"
          :question="currentQuestion"
        />
      </div>

      <div class="navigation-buttons">
        <el-button type="warning" @click="previousQuestion" :disabled="currentQuestionIndex === 0">
          previous
        </el-button>
        <el-button
          type="success"
          @click="nextQuestion"
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
    title="could not find your quiz."
    type="warning"
  />
  <el-alert :closable="false" v-else title="error finding your quiz." type="error" />
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
</style>
