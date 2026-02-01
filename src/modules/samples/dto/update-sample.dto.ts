import { PartialType } from '@nestjs/swagger';
import { CreateSampleFastQDto } from './create-sample-fastq.dto';

export class UpdateSampleDto extends PartialType(CreateSampleFastQDto) {}
