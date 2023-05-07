import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
}
