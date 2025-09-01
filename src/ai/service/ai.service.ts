import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResearchPaper } from 'src/paper/entity/researchPaper.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    @InjectRepository(ResearchPaper)
    private paperRepo: Repository<ResearchPaper>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async askQuestion(paperId: string, question: string): Promise<string> {
    const paper = await this.paperRepo.findOneBy({ id: paperId });
    if (!paper) throw new Error('Paper not found');

    const prompt = `
    You are an AI assistant. Use the following paper to answer the question:
    Paper content: ${paper.parsedText}
    
    Question: ${question}
    Answer concisely and clearly.
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content;
  }
}
