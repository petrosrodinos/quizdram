<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuizStore } from "../../../../../stores/quiz";
import type { Question, Quiz } from "../../../../../interfaces/quiz";
import { Refresh, Share } from "@element-plus/icons-vue";
import { useAuthStore } from "../../../../../stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { getQuiz } from "../../../../../services/quiz";

const route = useRoute();
const quizId = route.params.id as string;

const authStore = useAuthStore();

const quizStore = useQuizStore();
const quiz = ref<Quiz | undefined>(quizStore?.quizes.find((quiz: Quiz) => quiz.id === quizId));

const currentQuestionIndex = ref(0);

const selectedAnswers = ref<string[]>([]);

// const currentQuestion = computed(() => {
//   return quiz.value?.questions[currentQuestionIndex.value];
// });

const currentQuestion = ref<any>(quiz.value?.questions[currentQuestionIndex.value]);

const quizFinished = ref(false);

const { isLoading, data } = useQuery({
  queryKey: ["quizz", quizId as string],
  queryFn: () => getQuiz(quizId as string),
  enabled: !!authStore?.user && !!quizId,
});

watch(data, () => {
  if (!data.value) return;
  quiz.value = data.value;
  currentQuestion.value = data.value.questions[currentQuestionIndex.value];
});

const nextQuestion = () => {
  if (!quiz.value) return;
  if (currentQuestionIndex.value < quiz.value.questions.length - 1) {
    currentQuestionIndex.value++;
  } else if (currentQuestionIndex.value === quiz.value.questions.length - 1) {
    quizFinished.value = true;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

watch(currentQuestionIndex, () => {
  currentQuestion.value = quiz.value?.questions[currentQuestionIndex.value];
});

const handleAnswerChange = (answer: string) => {
  selectedAnswers.value = [
    ...selectedAnswers.value.slice(0, currentQuestionIndex.value),
    answer,
    ...selectedAnswers.value.slice(currentQuestionIndex.value + 1),
  ];
};

const calculateResult = () => {
  if (!quiz.value || selectedAnswers.value.length == 0) return;
  let score = 0;
  quiz.value.questions.forEach((question, index) => {
    if (
      question.type == "multiple" &&
      question.answers[Number(question.correct)] == selectedAnswers.value[index]
    ) {
      score++;
    } else {
      if (question.correct == selectedAnswers.value[index]) {
        score++;
      }
    }
  });
  return (score / quiz.value.questions.length) * 100;
};

const handlePlayAgain = () => {
  currentQuestionIndex.value = 0;
  selectedAnswers.value = [];
  quizFinished.value = false;
};
</script>

<template>
  <div v-if="quiz">
    <h1>{{ quiz.name }}</h1>
    <div v-if="!quizFinished">
      <h3>question {{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}</h3>
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
    <el-card v-else>
      <h2>quiz finished</h2>
      <h3>your score: {{ calculateResult() }}</h3>
      <div>
        <el-button type="success" @click="handlePlayAgain" :icon="Refresh"> play Again </el-button>

        <el-button type="primary" :icon="Share"> share </el-button>
      </div>
    </el-card>
  </div>

  <el-alert :closable="false" v-else-if="!quiz" title="could not find your quiz." type="warning" />
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
