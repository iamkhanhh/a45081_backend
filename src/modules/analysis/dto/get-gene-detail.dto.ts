import { IsString } from "class-validator";

export class GetGeneDetailDto {
    @IsString()
    geneName: string;
}