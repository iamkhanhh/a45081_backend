import { IsOptional, IsString } from "class-validator";

export class FilterUsersDto {
    @IsOptional()
    @IsString()
    searchTerm: string;

    @IsOptional()
    @IsString()
    role: string;

    @IsOptional()
    @IsString()
    status: string;
}