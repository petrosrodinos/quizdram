import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly mailService: MailerService,
    private configService: ConfigService,
  ) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    try {
      const adminEmail = this.configService.get('ADMIN_EMAIL');
      const message = `Review: ${createReviewDto.review} </br> Username: ${createReviewDto.username}`;

      const email = {
        from: createReviewDto.email,
        to: adminEmail,
        subject: `New QuizDram Review`,
        text: message,
      };

      this.mailService.sendMail(email);

      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      user.tokens += 1;

      await user.save();

      return {
        message: 'Review has been submitted',
        email,
      };
    } catch (error) {
      throw new Error('Error sending email');
    }
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
