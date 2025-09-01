import { IsOptional, IsString } from 'class-validator';

export class UploadPaperDto {
  @IsOptional()
  @IsString()
  title: string;
}
