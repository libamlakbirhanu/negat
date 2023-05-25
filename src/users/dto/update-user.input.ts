import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @Field()
  @IsString()
  first_name: string;

  @Field()
  @IsString()
  last_name: string;

  @Field()
  @IsString()
  user_name: string;

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
