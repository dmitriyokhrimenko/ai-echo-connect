import { Injectable } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dtos/create-refresh-token.dto';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create(refreshToken: CreateRefreshTokenDto) {
    return this.refreshTokenRepository.save(refreshToken);
  }

  async revokeAll(userId: number) {
    return this.refreshTokenRepository.delete({ user: { id: userId } });
  }
}
