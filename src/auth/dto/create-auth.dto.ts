import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator"

export class CreateAuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'Pass@123', description: 'Minimum 8 characters, at least one letter, one number and one special character' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: 'Minimum five characters, at least one letter, one number and one special character',
  })
  password: string

  @ApiPropertyOptional({ example: 'John', description: 'User first name' })
  @IsOptional()
  @IsString()
  first_name: string

  @ApiPropertyOptional({ example: 'Doe', description: 'User last name' })
  @IsOptional()
  @IsString()
  last_name: string

  @ApiPropertyOptional({ example: '123 Main St', description: 'User address' })
  @IsOptional()
  @IsString()
  address: string

  @ApiPropertyOptional({ example: 'MIT', description: 'User institution' })
  @IsOptional()
  @IsString()
  institution: string

  @ApiPropertyOptional({ example: '0123456789', description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone_number: string
}
