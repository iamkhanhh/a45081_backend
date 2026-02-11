import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'My Workspace', description: 'Workspace name' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 1, description: 'Pipeline ID associated with the workspace' })
  @IsNotEmpty()
  pipeline: number

  @ApiPropertyOptional({ example: 'default', description: 'Dashboard configuration' })
  @IsOptional()
  dashboard: string
}
