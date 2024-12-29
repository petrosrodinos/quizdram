import { IsString, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAttemptDto {
  @IsArray()
  @Type(() => String)
  selectedAnswers: [String];

  @IsString()
  @IsOptional()
  time: string;
}
