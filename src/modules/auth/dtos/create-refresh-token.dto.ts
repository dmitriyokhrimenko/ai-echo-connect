import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { TokenType } from '../entities/refresh-token.entity';

export class CreateRefreshTokenDto {
  @IsEnum(TokenType)
  type: TokenType;

  user: User;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsBoolean()
  revoked: boolean;

  @IsNumber()
  device_id: number;
}
