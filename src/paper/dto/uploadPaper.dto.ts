import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UploadPaperDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (!value) return [];
    return typeof value === 'string' ? JSON.parse(value) : value;
  })
  authors: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (!value) return [];
    return typeof value === 'string' ? JSON.parse(value) : value;
  })
  keywords: string[];

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  abstract?: string;
}



