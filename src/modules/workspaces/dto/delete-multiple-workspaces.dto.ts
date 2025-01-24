import { IsArray } from "class-validator";

export class DeleteMultipleWorkspacesDto{
    @IsArray()
    ids: number[]
}