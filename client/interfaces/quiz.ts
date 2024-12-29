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
  attempts: QuizAttempt[];
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
  userId: string;
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
