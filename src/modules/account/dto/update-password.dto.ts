import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

export class UpdatePasswordDto {
  @ApiProperty({ example: 'NewPass@123', description: 'New password (min 5 chars, at least one letter, one number and one special character)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: 'Minimum five characters, at least one letter, one number and one special character',
  })
  password: string

  @ApiProperty({ example: 'OldPass@123', description: 'Current password' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string
}
