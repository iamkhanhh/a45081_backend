import { IsArray } from "class-validator";

export class DeleteMultipleUsersDto{
    @IsArray()
    ids: number[]
}