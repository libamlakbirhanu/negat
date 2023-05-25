import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @Field()
  @IsString()
  confirmPassword: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  
  @Field()
  @IsString()
  gender: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  friends: string[];

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  going: string[];

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  interested: string[];

  @Field()
  @IsString()
  avatar_id: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  category_sub: string[];
}
