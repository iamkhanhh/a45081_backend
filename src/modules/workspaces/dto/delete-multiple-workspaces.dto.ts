import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class DeleteMultipleWorkspacesDto{
    @ApiProperty({ example: [1, 2, 3], description: 'Array of workspace IDs to delete' })
    @IsArray()
    ids: number[]
}
