import { ref, computed } from "vue";

export const useQuizGame = (quiz: any) => {
  const currentQuestionIndex = ref(0);
  const selectedAnswers = ref<string[]>([]);

  const currentQuestion = computed(() => {
    return quiz?.value.questions[currentQuestionIndex.value];
  });

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
