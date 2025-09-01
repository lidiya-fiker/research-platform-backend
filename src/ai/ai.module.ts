import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResearchPaper } from 'src/paper/entity/researchPaper.entity';
import { AiController } from './controller/ai.controller';
import { AiService } from './service/ai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([ResearchPaper]), ConfigModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
