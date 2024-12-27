import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { askOpenAI } from 'src/utils/openai';
import { generateQuizPrompt } from 'src/utils/prompt';
import { Quiz } from 'src/schemas/quiz.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<Quiz>,
  ) {}
  async create(createQuizDto: CreateQuizDto, userId?: string) {
    const prompt = generateQuizPrompt(createQuizDto);
    const quiz = await askOpenAI(prompt);

    const data = {
      userId: userId || 'visitor',
      ...JSON.parse(quiz),
    };

    const result = new this.quizModel(data);

    await result.save();

    return result;
  }

  findAll() {
    return `This action returns all quiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
