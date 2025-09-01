import { BadRequestException, Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as mammoth from 'mammoth';
import * as pdf from 'pdf-parse';
import * as path from 'path';

@Injectable()
export class FileParserService {

  async extractText(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.pdf') {
      return this.extractTextFromPdf(filePath);
    }

    if (ext === '.docx') {
      return this.extractTextFromDocx(filePath);
    }
    throw new BadRequestException('Unsupported file type');
  }

  private async extractTextFromPdf(filePath: string): Promise<string> {
    const dataBuffer = await readFile(filePath);
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
  }

  private async extractTextFromDocx(filePath: string): Promise<string> {
    const docBuffer = await readFile(filePath);
    const result = await mammoth.extractRawText({ buffer: docBuffer });
    return result.value;
  }
}
