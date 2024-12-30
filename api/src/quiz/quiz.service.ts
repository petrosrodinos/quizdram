import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { askOpenAI } from 'src/utils/openai';
import { generateQuizPrompt } from 'src/utils/prompt';
import { Quiz } from 'src/schemas/quiz.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<Quiz>,
  ) {}
  async create(createQuizDto: CreateQuizDto, userId?: string) {
    try {
      const prompt = generateQuizPrompt(createQuizDto);
      const quiz = await askOpenAI(prompt);

      const data = {
        userId: userId || 'visitor',
        ...JSON.parse(quiz),
      };

      const result = new this.quizModel(data);

      await result.save();

      return result;
    } catch (error) {
      return new Error(error);
    }
  }

  findAll(userId?: string) {
    try {
      return this.quizModel.find({ userId });
    } catch (error) {
      return new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const quiz = await this.quizModel.findById(id).lean();

      if (!quiz) {
        return new Error('Quiz not found');
      }
      quiz.attempts = quiz.attempts.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      return quiz;
    } catch (error) {
      return new Error(error);
    }
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }

  async createAttempt(id: string, userId: string, attempt: CreateAttemptDto) {
    try {
      const quiz = await this.quizModel.findById(id);

      if (!quiz) {
        return new Error('Quiz not found');
      }

      const data = {
        userId,
        ...attempt,
      };

      quiz.attempts.push(data);

      await quiz.save();

      return quiz;
    } catch (error) {
      return new Error(error);
    }
  }

  async getAttempt(id: string, attemptId: string) {
    try {
      const quiz = await this.quizModel.findById(id);

      if (!quiz) {
        return new Error('Quiz not found');
      }

      const attempt = quiz.attempts.find(
        (a: any) => a._id.toString() === attemptId,
      );

      if (!attempt) {
        return new Error('Attempt not found');
      }

      return {
        attempt: attempt,
        quiz: quiz,
      };
    } catch (error) {
      return new Error(error);
    }
  }
}
