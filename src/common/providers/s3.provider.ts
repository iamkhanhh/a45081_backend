import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

    async generateSinglePresignedUrl(fileName: string): Promise<string> {
        const params = {
            Bucket: this.configService.get<string>('AWS_BUCKET'),
            Key: fileName,
            Expires: 60 * 5,
            // ACL: 'bucket-owner-full-control',
            ContentType: 'text/vcard',
        };
        return this.s3Client.getSignedUrlPromise('putObject', params);
    }

    async startMultipartUpload(fileName: string) {
        const params: S3.CreateMultipartUploadRequest = {
            Bucket: this.configService.get<string>('AWS_BUCKET'),
            Key: fileName,
        };

        const multipart = await this.s3Client.createMultipartUpload(params).promise();
        return { uploadId: multipart.UploadId };
    }

    async generatePresignedUrls(fileName: string, uploadId: string, partNumbers: number) {
        const totalParts = Array.from({ length: partNumbers }, (_, i) => i + 1);

        const presignedUrls = await Promise.all(
            totalParts.map(async (partNumber) => {
                const params = {
                    Bucket: this.configService.get<string>('AWS_BUCKET'),
                    Key: fileName,
                    PartNumber: partNumber,
                    UploadId: uploadId,
                    Expires: 60 * 15,
                };
                return this.s3Client.getSignedUrlPromise('uploadPart', params);
            }),
        );

        return { presignedUrls };
    }

    async completeMultipartUpload(fileName: string, uploadId: string, parts: { etag: string }[]) {
        const params: S3.CompleteMultipartUploadRequest = {
            Bucket: this.configService.get<string>('AWS_BUCKET'),
            Key: fileName,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts.map((part, index) => ({
                    ETag: part.etag,
                    PartNumber: index + 1,
                })),
            },
        };

        return await this.s3Client.completeMultipartUpload(params).promise();
    }

    generateFileName(name: string) {
        name = name.replace(/\s/g, '_').trim();

        let extension = name.match(/\.[^.]+(\.[^.]+)?$/)?.[0] || '';
        let baseName = extension ? name.replace(extension, '') : name;

        let timeStamp = new Date().getTime().toString().trim();

        return `${baseName}-${timeStamp}-${uuidv4()}${extension}`;
    }
}
