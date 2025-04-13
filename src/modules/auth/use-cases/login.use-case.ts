import { Injectable } from '@nestjs/common';
import { ITokenPayload } from '../token-payload.interface';
import { TokenType } from '../entities/refresh-token.entity';
import { User } from '../../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token.service';
import { LoginResponce } from '../interfaces/LoginResponce';

@Injectable()
export class LoginUseCase {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async execute(user: User): Promise<LoginResponce> {
    const payload: ITokenPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });

    await this.refreshTokenService.create({
      type: TokenType.MOBILE,
      revoked: false,
      token: refreshToken,
      user,
      device_id: 123,
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
