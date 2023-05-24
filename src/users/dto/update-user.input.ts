import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

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

  @Field()
  @IsString()
  friends: string[];

  @Field()
  @IsString()
  going: string[];

  @Field()
  @IsString()
  interested: string[];

  @Field()
  @IsString()
  avatar_id: string;

  @Field()
  @IsString()
  category_sub: string[];
}
