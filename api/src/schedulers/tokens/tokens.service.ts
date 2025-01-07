import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ResetTokensService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private config: ConfigService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetAllUsersQuizzes() {
    const freeTokens = this.config.get('FREE_TOKENS');
    const users = await this.userModel.find();
    for (const user of users) {
      user.tokens = freeTokens;
      await user.save();
    }
    console.log('All users quizzes have been reset');
  }
}
