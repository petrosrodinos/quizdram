import type { User } from "./user";

export interface NewQuiz {
  prompt: string;
  questions: QuestionSettings[];
}

export interface QuestionSettingsMultiple {
  type: QuizType;
  answers: number;
  possibleCorrect: number;
  difficulty: QuizDifficulty;
}

export interface QuestionSettingsBoolean {
  type: QuizType;
  difficulty: QuizDifficulty;
}

export type QuestionSettings = QuestionSettingsMultiple | QuestionSettingsBoolean;

export interface Quiz {
  id: string;
  userId: User;
  name: string;
  questions: Question[];
  createdAt: string;
  attempts: QuizAttempt[];
  remainingTokens: number;
}

export interface Question {
  id: string;
  type: QuizType;
  question: string;
  answers: string[];
  correct: string;
}

export interface QuizAttempt {
  _id: string;
  userId: User;
  selectedAnswers: string[];
  time: string;
  createdAt: string;
}

export interface NewQuizAttempt {
  selectedAnswers: string[];
  quizId: string;
  time?: string;
}

export interface GetAttempt {
  quiz: Quiz;
  attempt: QuizAttempt;
}

export type QuizType = "multiple" | "boolean";
export type QuizDifficulty = "easy" | "medium" | "hard";
