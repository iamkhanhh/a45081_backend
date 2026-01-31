import { PartialType } from "@nestjs/swagger";
import { CreateWorkspaceDto } from "./create-workspace.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
    @ApiPropertyOptional({ example: 5, description: 'Workspace number' })
    @IsOptional()
    number: number
}
