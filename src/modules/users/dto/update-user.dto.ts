import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsMongoId()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}
