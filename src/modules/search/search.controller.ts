import { Controller, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { GlobalSearchDto } from './dto/global-search.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Post('global')
	@ApiOperation({
		summary: 'Global search across samples, workspaces, and analysis',
		description:
			'Search by name to find matching samples, workspaces, and analysis',
	})
	@ApiBody({ type: GlobalSearchDto })
	@ApiResponse({
		status: 200,
		description: 'Search completed successfully',
		schema: {
			example: {
				status: 'success',
				message: 'Global search completed',
				data: {
					samples: {
						count: 2,
						items: [
							{
								id: 1,
								name: 'Sample_001',
								type: 'sample',
								fileType: 'fastq',
								assembly: 'hg19',
								size: 2048576000,
								createdAt: '01/03/2026',
								status: 1,
							},
						],
					},
					workspaces: {
						count: 1,
						items: [
							{
								id: 1,
								name: 'Cancer Research',
								type: 'workspace',
								number: 'WS-001',
								pipeline: 1,
								createdAt: '15/02/2026',
								updatedAt: '01/03/2026',
							},
						],
					},
					analysis: {
						count: 1,
						items: [
							{
								id: 1,
								name: 'Analysis_Sample01',
								type: 'analysis',
								assembly: 'hg19',
								status: 5,
								variants: 4521,
								createdAt: '20/02/2026',
								analyzed: '01/03/2026',
								sequencingType: 'wgs',
							},
						],
					},
				},
				total: 4,
				searchTerm: 'Sample',
			},
		},
	})
	@ApiResponse({ status: 400, description: 'Bad request' })
	async globalSearch(@Request() req, @Body() globalSearchDto: GlobalSearchDto) {
		return this.searchService.globalSearch(req.user.id, globalSearchDto);
	}
}
