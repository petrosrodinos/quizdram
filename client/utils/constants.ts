import type { QuestionSettings } from "../interfaces/quiz";

export const API_URL = process.env.NUXT_API_URL || "http://localhost:5000/api/v1";

export const FRONT_END_URL = process.env.NUXT_FRONT_END_URL || "http://localhost:3000";

export const QUIZ_QUESTION_SETTINGS: QuestionSettings[] = [
  {
    type: "multiple",
    answers: 4,
    possibleCorrect: 1,
    difficulty: "easy",
  },
  {
    type: "multiple",
    answers: 4,
    possibleCorrect: 1,
    difficulty: "easy",
  },
  {
    type: "multiple",
    answers: 4,
    possibleCorrect: 1,
    difficulty: "easy",
  },
  {
    type: "multiple",
    answers: 4,
    possibleCorrect: 1,
    difficulty: "easy",
  },
  {
    type: "multiple",
    answers: 4,
    possibleCorrect: 1,
    difficulty: "medium",
  },
  {
    type: "multiple",
    answers: 4,
    possibleCorrect: 1,
    difficulty: "hard",
  },
  {
    type: "multiple",
    answers: 4,
    possibleCorrect: 1,
    difficulty: "hard",
  },
  {
    type: "boolean",
    difficulty: "easy",
  },
  {
    type: "boolean",
    difficulty: "medium",
  },
  {
    type: "boolean",
    difficulty: "hard",
  },
];
