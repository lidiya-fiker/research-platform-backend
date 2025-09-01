// src/ai/ai.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AiService } from '../service/ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Get('ask')
  async ask(
    @Query('paperId') paperId: string,
    @Query('question') question: string,
  ) {
    const answer = await this.aiService.askQuestion(paperId, question);
    return { paperId, question, answer };
  }
}
