import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;
    const candidate = await this.usersService.findOne({ email });
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

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    const { password: pass, ...userData } = user;
    if (user) {
      const isMatch = await bcrypt.compare(password, pass);
      if (isMatch) {
        return userData;
      }
    }
    return null;
  }

  async login(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload: ITokenPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
