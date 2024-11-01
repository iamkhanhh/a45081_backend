import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateWorkspaceDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  pipeline: number

  @IsOptional()
  dashboard: string
}
