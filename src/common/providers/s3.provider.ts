import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Provider {
    private readonly s3Client = new S3();

    constructor(
        private readonly configService: ConfigService
    ) {}
}
