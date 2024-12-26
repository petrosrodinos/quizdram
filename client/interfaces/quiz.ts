export interface NewQuiz {
  prompt: string;
  source: "ai" | "doc" | "video" | "text";
  difficulty?: "easy" | "medium" | "hard";
  type?: QuizType;
}

export interface Quiz {
  id?: string;
  userId?: string;
  name: string;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id?: string;
  type: QuizType;
  question: string;
  answers: string[];
  correct: string;
}

export type QuizType = "multiple" | "boolean";
