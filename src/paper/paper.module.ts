import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOADS_DIR } from 'src/constants';
import { PaperController } from './controller/paper.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: FILE_UPLOADS_DIR,
      limits: {
        fileSize: 1000 * 1000 * 10,
      },
    }),
  ],
  controllers: [PaperController],
  providers: [],
})
export class PaperModule {}
