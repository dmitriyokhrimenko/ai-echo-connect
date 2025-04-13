import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiRequestDto } from './dto/gemini-request.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('ask')
  askGemini(@Body() geminiRequestDto: GeminiRequestDto) {
    return this.geminiService.create(geminiRequestDto);
  }
}
