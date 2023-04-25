import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation((returns) => User)
  // create(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @Query((returns) => [User])
  async findAll() {
    const usersData = await this.usersService.findAll();

    return usersData;
  }

  // @Query((returns) => User)
  // findOne(@Args('id') id: number) {
  //   return this.usersService.findOne(id);
  // }
}
