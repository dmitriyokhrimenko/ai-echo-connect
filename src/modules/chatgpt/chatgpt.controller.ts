import { Controller, Post, Body } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';
import { ChatGptRequestDto } from './dto/chatgpt-request.dto';

@Controller('chatgpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post('ask')
  async askChatGpt(@Body() chatGptRequestDto: ChatGptRequestDto) {
    return this.chatGptService.getChatGptCompletion(chatGptRequestDto.prompt);
  }
}
