import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FILE_UPLOADS_DIR } from 'src/constants';
import { acceptableFileFilter, fileNameEditor } from '../file.utils';
import { request } from 'express';
import { UploadPaperDto } from '../dto/uploadPaper.dto';

@Controller('paper')
export class PaperController {
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

    return {
      filename: file.filename,
      size: file.size,
    };
  }
}
