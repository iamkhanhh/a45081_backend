import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class DeleteMultipleUsersDto{
    @ApiProperty({ example: [1, 2, 3], description: 'Array of user IDs to delete' })
    @IsArray()
    ids: number[]
}
