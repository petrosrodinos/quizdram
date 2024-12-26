import type { Quiz } from "@interfaces/quiz";
import { defineStore } from "pinia";

const QUIZ_STORE_KEY = "quiz";

export const useQuizStore = defineStore(
  QUIZ_STORE_KEY,
  () => {
    const quizes = ref<Quiz[]>([]);
    function setQuiz(newQuiz: any) {
      quizes.value.push(newQuiz);
    }

    return { quizes, setQuiz };
  },
  {
    persist: true,
  }
);
