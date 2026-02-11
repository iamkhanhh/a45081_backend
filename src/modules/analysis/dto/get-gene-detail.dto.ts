import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetGeneDetailDto {
    @ApiProperty({ example: 'BRCA1', description: 'Gene name to get details for' })
    @IsString()
    geneName: string;
}
