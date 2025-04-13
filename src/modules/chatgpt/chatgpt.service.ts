import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatGptService {
  constructor(private readonly configService: ConfigService) {}
  private readonly OPENAI_URL = this.configService.getOrThrow('OPENAI_URL');
  private readonly OPENAI_KEY = this.configService.getOrThrow('OPENAI_KEY');

  getChatGptCompletion(prompt: string) {
    return prompt;
  }
}
