import { PartialType } from '@nestjs/mapped-types';
import { CreateSampleFastQDto } from './create-sample-fastq.dto';

export class UpdateSampleDto extends PartialType(CreateSampleFastQDto) {}
