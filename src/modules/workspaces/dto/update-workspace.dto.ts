import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateWorkspaceDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  pipeline: number

  @IsOptional()
  dashboard: string
}