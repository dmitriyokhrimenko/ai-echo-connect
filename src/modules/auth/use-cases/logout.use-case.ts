import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { RefreshTokenService } from '../refresh-token.service';

@Injectable()
export class LogoutUseCase {
  constructor(private refreshTokenService: RefreshTokenService) {}

  async execute(user: User) {
    this.refreshTokenService.revokeAll(user.id);
  }
}
