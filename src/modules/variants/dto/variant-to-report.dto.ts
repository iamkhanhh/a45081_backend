import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class VariantToReportDto {
  @ApiProperty({ example: 'chr17', description: 'Chromosome' })
  @IsString()
  chrom: string;

  @ApiProperty({ example: '43044295', description: 'Genomic position' })
  @IsString()
  pos: string;

  @ApiProperty({ example: 'A', description: 'Reference allele' })
  @IsString()
  ref: string;

  @ApiProperty({ example: 'T', description: 'Alternate allele' })
  @IsString()
  alt: string;

  @ApiProperty({ example: 'BRCA1', description: 'Gene name' })
  @IsString()
  gene: string;

  @ApiPropertyOptional({ example: '43044296', description: 'End position' })
  @IsOptional()
  @IsString()
  end?: string;
}
