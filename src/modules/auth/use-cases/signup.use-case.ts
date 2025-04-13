import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dtos/signup.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SignupUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(signupDto: SignupDto) {
    const { email, password, name } = signupDto;
    const candidate = await this.usersService.getUserByEmail(email);
    if (candidate) {
      throw new BadRequestException(
        `User ${candidate.email} is already registered`,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      password: hashedPassword,
      email,
      name,
    });
  }
}
