import type { QuestionSettings } from "../interfaces/quiz";

export const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:3000";

export const FREE_TOKENS: number = parseInt(process.env.FREE_TOKENS || "3");

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
