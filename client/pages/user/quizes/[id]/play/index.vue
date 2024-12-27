<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuizStore } from "../../../../../stores/quiz";
import type { Quiz } from "../../../../../interfaces/quiz";
import { Refresh, Share } from "@element-plus/icons-vue";

const route = useRoute();
const quizId = route.params.id as string;

const quizStore = useQuizStore();
const quiz: Quiz | undefined = quizStore?.quizes.find((quiz: Quiz) => quiz.id === quizId);

const currentQuestionIndex = ref(0);

const selectedAnswers = ref<string[]>([]);

const currentQuestion = computed(() => {
  return quiz?.questions[currentQuestionIndex.value];
});

const quizFinished = ref(false);

const nextQuestion = () => {
  if (!quiz) return;
  if (currentQuestionIndex.value < quiz.questions.length - 1) {
    currentQuestionIndex.value++;
  } else if (currentQuestionIndex.value === quiz.questions.length - 1) {
    quizFinished.value = true;
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

const calculateResult = () => {
  if (!quiz || selectedAnswers.value.length == 0) return;
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (
      question.type == "multiple" &&
      question.answers[Number(question.correct)].toLowerCase() ==
        selectedAnswers.value[index].toLowerCase()
    ) {
      score++;
    } else {
      if (question.correct == selectedAnswers.value[index]) {
        score++;
      }
    }
  });
  return (score / quiz.questions.length) * 100;
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
      <h3>Question {{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}</h3>
      <div v-if="currentQuestion">
        <QuizQuestion
          :answer="selectedAnswers[currentQuestionIndex] || ''"
          @onAnswerChange="handleAnswerChange"
          :question="currentQuestion"
        />
      </div>

      <div class="navigation-buttons">
        <el-button type="warning" @click="previousQuestion" :disabled="currentQuestionIndex === 0">
          Previous
        </el-button>
        <el-button
          type="success"
          @click="nextQuestion"
          :disabled="!selectedAnswers[currentQuestionIndex]"
        >
          {{ currentQuestionIndex === quiz.questions.length - 1 ? "Finish" : "Next" }}
        </el-button>
      </div>
    </div>
    <el-card v-else>
      <h2>Quiz Finished</h2>
      <h3>Your Score: {{ calculateResult() }}</h3>
      <div>
        <el-button type="success" @click="handlePlayAgain" :icon="Refresh"> Play Again </el-button>

        <el-button type="primary" :icon="Share"> Share </el-button>
      </div>
    </el-card>
  </div>

  <el-alert v-else-if="!quiz" title="Could not find your quiz" type="warning" />
  <el-alert v-else title="Error finding your quiz" type="error" />
</template>

<style lang="scss" scoped>
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
