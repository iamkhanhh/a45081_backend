export enum AnalysisStatus {
    QUEUING = 0,
    ANALYZING = 1, 
    ANALYZED = 2,
    ERROR = 3,
    VEP_ANALYZED = 4,
    IMPORTING = 5,
    FASTQ_QUEUING = 6,
    FASTQ_ANALYZING = 7,
    FASTQ_ERROR = 8,
}

export enum AnalysisSequencingType {
    WGS = "WGS",
    WES = "WES"
}