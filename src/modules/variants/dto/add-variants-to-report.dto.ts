import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { VariantToReportDto } from "./variant-to-report.dto";

export class AddVariantsToReport {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantToReportDto)
    variants: VariantToReportDto[];
}