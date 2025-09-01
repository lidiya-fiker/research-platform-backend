import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResearchPaper } from '../entity/researchPaper.entity';
import { Repository } from 'typeorm';
import { FileParserService } from './fileParser.service';
import { UploadPaperDto } from '../dto/uploadPaper.dto';
import { FILE_UPLOADS_DIR } from 'src/constants';
import * as path from 'path';


@Injectable()
export class PaperService {
  constructor(
    @InjectRepository(ResearchPaper)
    private readonly paperRepo: Repository<ResearchPaper>,
    private readonly fileParserService: FileParserService,
  ) {}

  async create(file: Express.Multer.File, dto: UploadPaperDto) {
      const filepath = path.join(FILE_UPLOADS_DIR, file.filename);
      

    const parsedText = await this.fileParserService.extractText(filepath);

    const paper = this.paperRepo.create({
      ...dto,
      fileUrl: file.filename,
      parsedText,
    });

    return this.paperRepo.save(paper);
  }
}
