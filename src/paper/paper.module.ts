import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOADS_DIR } from 'src/constants';
import { PaperController } from './controller/paper.controller';
import { PaperService } from './service/paper.service';
import { FileParserService } from './service/fileParser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchPaper } from './entity/researchPaper.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: FILE_UPLOADS_DIR,
      limits: {
        fileSize: 1000 * 1000 * 10,
      },
    }),
    TypeOrmModule.forFeature([ResearchPaper]),
  ],
  controllers: [PaperController],
  providers: [PaperService, FileParserService],
  exports: [PaperService],
})
export class PaperModule {}
