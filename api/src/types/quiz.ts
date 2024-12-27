import { QuizTypeEnum, QuizDifficultyEnum } from 'src/enums/quiz';

export type QuizSettings = {
  prompt: string;
  questions: Array<Question>;
};

export type Question = {
  type: QuizTypeEnum;
  answers: number;
  possibleCorrect: number;
  difficulty: QuizDifficultyEnum;
};
