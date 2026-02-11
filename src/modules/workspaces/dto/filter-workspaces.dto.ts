import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class FilterWorkspacesDto {
    @ApiPropertyOptional({ example: 'my workspace', description: 'Search by workspace name' })
    @IsOptional()
    @IsString()
    searchTerm: string

    @ApiPropertyOptional({ example: '2025-01-01', description: 'Filter workspaces created after this date' })
    @IsString()
    searchDate: string
}
