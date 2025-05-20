import { IsString, IsOptional } from 'class-validator';

export class VariantToReportDto {
  @IsString()
  chrom: string;

  @IsString()
  pos: string;

  @IsString()
  ref: string;

  @IsString()
  alt: string;

  @IsString()
  gene: string;

  @IsOptional()
  @IsString()
  end?: string;
}
