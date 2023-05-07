import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async removePassword(user: User) {
    const { password, ...restUserData } = user;
    return restUserData;
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOne({ email });
      await this.verifyPassword(password, user.password);

      return this.removePassword(user);
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  register(userInput: CreateUserInput): Promise<User> {
    const newUser = this.usersService.create(userInput);

    return newUser;
  }

  async createToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    // return `accessToken=${token}; HttpOnly; Path=/; Max-Age=3600s`;
    return token;
  }
}
