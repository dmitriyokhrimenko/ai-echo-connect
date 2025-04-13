import { IsString } from 'class-validator';

export class GeminiRequestDto {
  @IsString()
  prompt: string;
}
