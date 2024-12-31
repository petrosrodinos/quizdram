import type { NewQuiz } from "@interfaces/quiz";
import { defineStore } from "pinia";

const STORE_KEY = "QUIZ";

export const useQuizStore = defineStore(
  STORE_KEY,
  () => {
    const quizSettings = ref<NewQuiz>();
    function setQuizSettings(settings: NewQuiz) {
      quizSettings.value = settings;
    }

    return { quizSettings, setQuizSettings };
  },
  {
    persist: true,
  }
);
