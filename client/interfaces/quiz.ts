export interface NewQuiz {
  prompt: string;
  source: "ai" | "doc" | "video" | "text";
  difficulty?: "easy" | "medium" | "hard";
  type?: QuizType;
}

export interface Quiz extends NewQuiz {
  id?: string;
  creatorId?: string;
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
