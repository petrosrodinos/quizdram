import type { Quiz } from "@interfaces/quiz";
import { defineStore } from "pinia";

const STORE_KEY = "QUIZ";

export const useQuizStore = defineStore(
  STORE_KEY,
  () => {
    const quizes = ref<Quiz[]>([]);
    function setQuiz(newQuiz: any) {
      let prevquizes = quizes.value;
      prevquizes.push(newQuiz);
      quizes.value = prevquizes;
    }

    return { quizes, setQuiz };
  },
  {
    persist: true,
  }
);
