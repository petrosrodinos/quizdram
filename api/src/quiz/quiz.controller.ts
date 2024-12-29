import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { LooseJwtGuard, JwtGuard } from 'src/api/auth/guard';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(LooseJwtGuard)
  @Post()
  create(@Req() req: Express.Request, @Body() createQuizDto: CreateQuizDto) {
    const userId = req.user?.userId;

    return this.quizService.create(createQuizDto, userId);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: Express.Request) {
    const userId = req.user?.userId;

    return this.quizService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/attempt')
  attempt(
    @Req() req: Express.Request,
    @Param('id') id: string,
    @Body() attempt: CreateAttemptDto,
  ) {
    const userId = req.user?.userId;

    return this.quizService.createAttempt(id, userId, attempt);
  }

  @Get(':id/attempt/:attemptId')
  getAttempt(@Param('id') id: string, @Param('attemptId') attemptId: string) {
    return this.quizService.getAttempt(id, attemptId);
  }
}
