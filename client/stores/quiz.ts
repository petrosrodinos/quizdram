import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", () => {
  const quiz = ref({});
  function setQuiz(newQuiz: any) {
    quiz.value = newQuiz;
  }

  return { quiz, setQuiz };
});
