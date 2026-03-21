import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReferencesReportedDto {
    @ApiProperty({
        example: '12345',
        description: 'Reference ID (e.g., PMID)',
    })
    @IsString()
    id: string;

    @ApiProperty({
        example: '1976 Dec',
        description: 'Publication date',
    })
    @IsString()
    date: string;

    @ApiProperty({
        example: 'J Pharm Pharmacol',
        description: 'Source journal',
    })
    @IsString()
    source: string;

    @ApiProperty({
        example: 'A new granulation method for compressed tablets [proceedings].',
        description: 'Reference title',
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: ['Smith J', 'Johnson A'],
        description: 'List of authors',
    })
    @IsString({ each: true })
    authors: string[];
}
