import { Injectable } from '@nestjs/common';
import { GeminiRequestDto } from './dto/gemini-request.dto';

@Injectable()
export class GeminiService {
  create(createGeminiDto: GeminiRequestDto) {
    return createGeminiDto;
  }
}
