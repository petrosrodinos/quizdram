import type { NewQuiz } from "@interfaces/quiz";
import { defineStore } from "pinia";

const STORE_KEY = "QUIZ";

export const useQuizStore = defineStore(
  STORE_KEY,
  () => {
    const quizSettings = ref<NewQuiz>();
    const savedPrompt = ref<string>("");
    function setQuizSettings(settings: NewQuiz | undefined) {
      quizSettings.value = settings;
    }
    function setSavedPrompt(prompt: string) {
      savedPrompt.value = prompt;
    }

    return { quizSettings, setQuizSettings, savedPrompt, setSavedPrompt };
  },
  {
    persist: true,
  }
);
