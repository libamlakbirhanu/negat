import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  // @IsString()
  first_name: string;

  @Field({ nullable: true })
  // @IsString()
  last_name: string;

  @Field({ nullable: true })
  // @IsString()
  user_name: string;

  @Field({ nullable: true })
  // @IsString()
  gender: string;

  @Field(() => [String], { nullable: true })
  // @IsString()
  friends: string[];

  @Field(() => [String], { nullable: true })
  // @IsString()
  going: string[];

  @Field(() => [String], { nullable: true })
  // @IsString()
  interested: string[];

  @Field({ nullable: true })
  // @IsString()
  avatar_id: string;

  @Field(() => [String], { nullable: true })
  // @IsString()
  category_sub: string[];
}
