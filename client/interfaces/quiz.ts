export interface NewQuiz {
  prompt: string;
  questions: Array<QuestionSettings>;
}

export interface QuestionSettings {
  type: QuizType;
  answers: number;
  possibleCorrect: number;
  difficulty: QuizDifficulty;
}

export interface Quiz {
  id: string;
  userId: string;
  name: string;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id: string;
  type: QuizType;
  question: string;
  answers: string[];
  correct: string;
}

export type QuizType = "multiple" | "boolean";
export type QuizDifficulty = "easy" | "medium" | "hard";
