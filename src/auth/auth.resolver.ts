import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthService } from 'src/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';

@ObjectType()
class LoginReturnType {
  @Field(() => User)
  data: User;

  @Field()
  accessToken: string;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.authService.register(createUserInput);

    return user;
  }

  @Mutation(() => LoginReturnType)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @GetUser() user: User,
  ) {
    const token = await this.authService.createToken(user);
    // response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return { data: user, accessToken: token };
  }
}
