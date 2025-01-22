import { IsOptional, IsString } from "class-validator"

export class FilterWorkspacesDto {
    @IsOptional()
    @IsString()
    searchTerm: string

    @IsString()
    searchDate: string
}