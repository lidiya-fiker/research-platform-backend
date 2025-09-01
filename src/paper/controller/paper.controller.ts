import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FILE_UPLOADS_DIR } from 'src/constants';
import { acceptableFileFilter, fileNameEditor } from '../file.utils';
import { UploadPaperDto } from '../dto/uploadPaper.dto';
import { PaperService } from '../service/paper.service';

@Controller('paper')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor,
        destination: FILE_UPLOADS_DIR,
      }),
      limits: {
        fileSize: 1000 * 1000 * 10,
      },
      fileFilter: acceptableFileFilter,
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadPaperDto,
  ) {
    console.log('FILE:', file);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const paper = await this.paperService.create(file, dto);

    return {
      message: 'Paper uploaded successfully',
      paper,
    };
  }
}
