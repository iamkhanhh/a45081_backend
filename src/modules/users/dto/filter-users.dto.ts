import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class FilterUsersDto {
    @ApiPropertyOptional({ example: 'john', description: 'Search by name or email' })
    @IsOptional()
    @IsString()
    searchTerm: string;

    @ApiPropertyOptional({ example: 'user', description: 'Filter by role' })
    @IsOptional()
    @IsString()
    role: string;

    @ApiPropertyOptional({ example: 'active', description: 'Filter by status' })
    @IsOptional()
    @IsString()
    status: string;
}
