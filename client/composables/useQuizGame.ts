// composables/useQuizGame.ts
import { ref, computed, watch } from "vue";
import type { Question } from "../interfaces/quiz";

export const useQuizGame = (quiz: any) => {
  const currentQuestionIndex = ref(0);
  const selectedAnswers = ref<string[]>([]);
  //   const currentQuestion = ref<Question | undefined>(undefined);

  //   currentQuestion.value = quiz?.value?.questions?.[currentQuestionIndex.value];

  const currentQuestion = computed(() => {
    return quiz?.value.questions[currentQuestionIndex.value];
  });

  //   watch(quiz, () => {
  //     currentQuestion.value = quiz?.value.questions[currentQuestionIndex.value];
  //   });

  //   watch(currentQuestionIndex, () => {
  //     currentQuestion.value = quiz?.value.questions[currentQuestionIndex.value];
  //   });

  const nextQuestion = () => {
    if (!quiz) return;

    if (currentQuestionIndex.value < quiz.value.questions.length - 1) {
      currentQuestionIndex.value++;
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

  return {
    currentQuestionIndex,
    currentQuestion,
    selectedAnswers,
    nextQuestion,
    previousQuestion,
    handleAnswerChange,
  };
};
