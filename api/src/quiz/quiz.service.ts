import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { askOpenAI } from 'src/utils/openai';
import { generateQuizPrompt } from 'src/utils/prompt';
import { Quiz } from 'src/schemas/quiz.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<Quiz>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async create(createQuizDto: CreateQuizDto, userId?: string) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        return new Error('User not found');
      }

      if (user.tokens < 1) {
        return new Error('Not enough  tokens');
      }

      const prompt = generateQuizPrompt(createQuizDto);
      const quiz = await askOpenAI(prompt);

      const data = {
        userId: userId || 'visitor',
        ...JSON.parse(quiz),
      };

      const result = new this.quizModel(data);

      user.tokens -= 1;

      await user.save();

      await result.save();

      const response = {
        ...result.toObject(),
        remainingTokens: user.tokens,
      };

      return response;
    } catch (error) {
      return new Error(error);
    }
  }

  findAll(query?: any) {
    try {
      let result: any;
      let filters = query || {};

      const { attempt, userId } = query;

      if (attempt && userId) {
        filters = {
          attempts: {
            $elemMatch: {
              userId,
            },
          },
          userId: { $ne: userId },
        };
      }

      result = this.quizModel
        .find(filters)
        .sort({ createdAt: -1 })
        .populate('userId attempts.userId', '-password');

      return result;
    } catch (error) {
      return new Error(error);
    }
  }

  async findOne(id: string, query?: any) {
    try {
      const quiz = await this.quizModel
        .findById(id)
        .populate('userId attempts.userId', '-password');

      if (!quiz) {
        throw new NotFoundException('could not find quiz.');
      }

      const userId = query?.userId;

      if (userId) {
        quiz.attempts = quiz.attempts.filter(
          (a: any) => a.userId._id.toString() === userId,
        );
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
      const quiz = await this.quizModel
        .findById(id)
        .populate('attempts.userId', '-password');

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
