import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GlobalSearchDto {
	@ApiPropertyOptional({
		example: 'Sample_001',
		description:
			'Search term to find in sample name, workspace name, or analysis name',
	})
	@IsOptional()
	@IsString()
	searchTerm: string;
}
