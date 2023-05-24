import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { UserUpdateInput } from './dto/update-user.input';
import { ExecutionContext } from 'graphql/execution/execute';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // query resolvers
  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async findAll(@GetUser() user: User) {
    const usersData = await this.usersService.findAll();

    return usersData;
  }

  @Query(() => User)
  findOne(@Args('id') id: number, @Args('email') email: string) {
    return this.usersService.findOne({ id, email });
  }

  // mutation resolvers
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async register(
    @Args('createUserInput') userUpdateInput: UserUpdateInput,
    @Context() context: any,
  ) {
    const request = context.req();
    const authenticatedUser = request.user;

    const user = await this.usersService.updateUser(
      userUpdateInput,
      authenticatedUser,
    );

    return user;
  }
}
