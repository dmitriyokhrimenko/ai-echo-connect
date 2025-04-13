import { IsString } from 'class-validator';

export class ChatGptRequestDto {
  @IsString()
  prompt: string;
}
