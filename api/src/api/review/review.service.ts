import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReviewService {
  constructor(
    private readonly mailService: MailerService,
    private configService: ConfigService,
  ) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    try {
      const adminEmail = this.configService.get('ADMIN_EMAIL');
      const platformEmail = this.configService.get('PLATFORM_EMAIL');
      const html = `
      <div>
        <h1>New Review</h1>
        <p>Review: ${createReviewDto.review}</p>
        <p>Username: ${createReviewDto.username}</p>
        <p>Email: ${createReviewDto.email}</p>
      </div>
      `;
      const email = {
        from: adminEmail,
        to: platformEmail,
        subject: `New QuizDram Review`,
        html,
      };

      this.mailService.sendMail(email);

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
