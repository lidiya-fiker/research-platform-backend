import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResearchPaper } from 'src/paper/entity/researchPaper.entity';
import { AiController } from './controller/ai.controller';
import { AiService } from './service/ai.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Module({
  imports: [TypeOrmModule.forFeature([ResearchPaper]), ConfigModule],
  controllers: [AiController],
  providers: [
    AiService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('OPENAI_API_KEY');
        return new OpenAI({ apiKey });
      },
      inject:[ConfigService],
    },
  ],
  exports:[AiService]
})
export class AiModule {}
