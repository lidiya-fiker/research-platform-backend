import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const fileNameEditor = (
  req: Request,
  file: any,
  callback: (error: any, filename) => void,
) => {
  const newFileName = 'whatever' + file.originalname;

  callback(null, newFileName);
};

export const acceptableFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: any, acceptableFile: boolean) => void,
) => {
  if (!file.originalname || !file.originalname.match(/\.(pdf|docx)$/i))
    return callback(
      new BadRequestException('file must be of type PDF|DOCX'),
      false,
    );
  callback(null, true);
};
