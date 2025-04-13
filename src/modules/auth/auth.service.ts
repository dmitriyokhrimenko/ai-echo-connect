import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginUseCase } from './use-cases/login.use-case';
import { SignupUseCase } from './use-cases/signup.use-case';
import { LogoutUseCase } from './use-cases/logout.use-case';
import { LoginResponce } from './interfaces/LoginResponce';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private loginUseCase: LoginUseCase,
    private signupUseCase: SignupUseCase,
    private logoutUseCase: LogoutUseCase,
  ) {}

  async signup(signupDto: SignupDto) {
    return this.signupUseCase.execute(signupDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;
    const { password: pass, ...userData } = user;
    if (user) {
      const isMatch = await bcrypt.compare(password, pass);
      if (isMatch) {
        return userData;
      }
    }
    return null;
  }

  async login(user: User): Promise<LoginResponce> {
    return this.loginUseCase.execute(user);
  }

  async logout(user: User): Promise<void> {
    return this.logoutUseCase.execute(user);
  }
}
