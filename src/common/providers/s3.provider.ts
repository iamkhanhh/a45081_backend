import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Provider {
    private readonly s3Client = new S3({
        credentials: {
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
        },
        region: this.configService.get<string>('AWS_REGION'),
    });

    constructor(
        private readonly configService: ConfigService
    ) { }

    async copyObject(source: string, destination: string) {
        try {
            await this.s3Client.copyObject({
                Key: destination,
                CopySource: source,
                Bucket: this.configService.get('AWS_BUCKET')
            }).promise();
            console.log('Copy successful');
        } catch (error) {
            console.error('S3Provider@copyObject:', error);
            throw error;
        }
    }
}
