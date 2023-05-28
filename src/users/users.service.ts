import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserUpdateInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(userInput);

    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne({ id, email }: { id?: number; email?: string }): Promise<User> {
    return this.usersRepository.findOneBy(id ? { id } : { email });
  }

  async updateUser(
    {
      first_name,
      avatar_id,
      gender,
      interested,
      user_name,
      going,
      last_name,
      friends,
      category_sub,
    }: UserUpdateInput,
    authenticatedUser: User,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id: authenticatedUser.id,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newInterested = [...(interested || []), ...user.interested];
    const newFriends = [...(friends || []), ...user.friends];
    const newGoing = [...(going || []), ...user.going];
    const newCategory = [...(category_sub || []), ...user.category_sub];

    Object.assign(user, {
      first_name,
      avatar_id,
      gender,
      user_name,
      last_name,
      interested: newInterested,
      going: newGoing,
      friends: newFriends,
      category_sub: newCategory,
    });
    await this.usersRepository.save(user);

    return this.usersRepository.findOneBy({
      id: authenticatedUser.id,
    });
  }
}
