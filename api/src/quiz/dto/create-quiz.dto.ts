import { IsString, IsArray, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { QuizTypeEnum, QuizDifficultyEnum } from 'src/enums/quiz';

export class QuestionDto {
  @IsEnum(QuizTypeEnum)
  type: QuizTypeEnum;

  @IsInt()
  @Min(1)
  @Max(10)
  answers: number;

  @IsInt()
  @Min(1)
  @Max(10)
  possibleCorrect: number;

  @IsEnum(QuizDifficultyEnum)
  difficulty: QuizDifficultyEnum;
}

export class CreateQuizDto {
  @IsString()
  prompt: string;

  @IsArray()
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
