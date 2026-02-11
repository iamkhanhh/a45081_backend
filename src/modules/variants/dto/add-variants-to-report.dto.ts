import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { VariantToReportDto } from "./variant-to-report.dto";

export class AddVariantsToReport {
    @ApiProperty({ type: [VariantToReportDto], description: 'List of variants to add to the report' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantToReportDto)
    variants: VariantToReportDto[];
}
