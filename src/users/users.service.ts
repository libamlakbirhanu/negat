import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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
}
