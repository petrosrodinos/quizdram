import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    description: 'username of the user',
    format: 'string',
  })
  @Prop()
  username: string;

  @ApiProperty({
    description: 'email of the user',
    format: 'string',
  })
  @Prop({ unique: true })
  email: string;

  @ApiProperty({
    description: 'password of the user',
    format: 'string',
  })
  @Prop()
  password: string;

  @ApiProperty({
    description: 'avatar of the user',
    format: 'string',
  })
  @Prop({
    type: String,
    required: false,
  })
  avatar: any;

  @Prop({
    type: Number,
    required: false,
    default: 3,
  })
  tokens: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
