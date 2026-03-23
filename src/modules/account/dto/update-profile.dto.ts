import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
	@IsOptional()
	@IsString()
	phone_number?: string;

	@IsOptional()
	@IsString()
	address?: string;

	@IsOptional()
	@IsString()
	institution?: string;

	@IsOptional()
	@IsString()
	first_name?: string;

	@IsOptional()
	@IsString()
	last_name?: string;
}
