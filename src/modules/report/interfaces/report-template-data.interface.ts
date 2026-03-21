import { ReportVariantData } from ".";

export interface ReportTemplateData {
    report_name: string;
    patient_no: string;
    patient_name: string;
    dob: string;
    gender: string;
    ethnicity: string;
    physician_name: string;
    specimen: string;
    received_date: string;
    prepared_by: string;
    report_date: string;
    test_requested: string;
    clinical_information: string;
    summary: { text: string }[];
    variants: ReportVariantData[];
    details: { text: string }[];
    references: { text: string }[];
}