import { IsOptional, IsString } from "class-validator"

export class FilterSampleDto {
    @IsString()
    @IsOptional()
    type: string

    @IsString()
    @IsOptional()
    searchTerm: string

    @IsString()
    @IsOptional()
    assembly: string
}
