import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';

@Injectable()
export class CommonProvider {
    private readonly logger = new Logger(CommonProvider.name);

    constructor(
        private readonly configService: ConfigService
    ) { }

    getMongoCollectionName(analysisId: number) {
        return `${this.configService.get<string>('MONGO_DB_PREFIX')}_${analysisId}`;
    }

    async runCommand(command: string): Promise<string> {
        console.log(`Running command: ${command}`);
        
        return await new Promise((resolve, reject) => {
            exec(command, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
                if (error) {
                    this.logger.error(stderr);
                    return reject(error)
                } else {
                    return resolve(stdout);
                }
            });
        })
    }
}
