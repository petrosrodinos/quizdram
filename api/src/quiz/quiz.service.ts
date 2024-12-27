import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { askOpenAI } from 'src/utils/openai';
import { generateQuizPrompt } from 'src/utils/prompt';

@Injectable()
export class QuizService {
  async create(createQuizDto: CreateQuizDto) {
    const prompt = generateQuizPrompt(createQuizDto);
    const result = await askOpenAI(prompt);

    return {
      result: JSON.parse(result),
    };
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
