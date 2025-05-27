import { Analysis } from '@/entities';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MongodbProvider } from './mongodb.provider';
import { AnalysisStatus } from '@/enums';
import { CommonProvider } from './common.provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SampleImportProvider {
    private readonly logger = new Logger(SampleImportProvider.name);

    constructor(
        @InjectRepository(Analysis) private analysisRepository: Repository<Analysis>,
        private readonly mongodbProvider: MongodbProvider,
        private readonly commonProvider: CommonProvider,
        private readonly configService: ConfigService
    ) { }

    // @Cron(CronExpression.EVERY_30_SECONDS)
    async checkAnalyzed() {
        let analysisImporting = await this.getAnalysisByStatus(AnalysisStatus.IMPORTING);
        if (analysisImporting) {
            return this.logger.log('Analysis is already importing');
        }

        let analysis = await this.getAnalysisByStatus(AnalysisStatus.VEP_ANALYZED);
        if (!analysis) {
            return this.logger.log('No queued analysis');
        }

        this.logger.log(`Importing analysis with ID: ${analysis.id}`);
        await this.analysisRepository.update({ id: analysis.id }, { status: AnalysisStatus.IMPORTING });

        let importCheck = await this.import(analysis);

        if (importCheck) {
            this.logger.log(`Import successful for analysis ID: ${analysis.id}`);
            return await this.onImportSuccess(analysis);
        } else {
            this.logger.error(`Import failed for analysis ID: ${analysis.id}`);
            return await this.onImportError(analysis);
        }
    }

    async import(analysis: Analysis): Promise<boolean> {
        try {
            this.logger.log(`Starting import for analysis ID: ${analysis.id}`);
            let collectionName = this.commonProvider.getMongoCollectionName(analysis.id);

            let file_path = `${this.configService.get<string>('MOUNT_FOLDER')}/${analysis.file_path}`
            let options = [
                `--host ${this.configService.get<string>('MONGO_DB_HOST')} --port ${this.configService.get<string>('MONGO_DB_PORT')}`,
                `--collection ${collectionName}`,
                `--db ${this.configService.get<string>('MONGO_DB_DATABASE')}`,
                `--type tsv`,
                `--headerline`,
                `--file ${file_path}`,
                `--drop`
            ]

            let command = `${this.configService.get<string>('MONGO_IMPORT_CMD')} ${options.join(' ')}`

            await this.commonProvider.runCommand(command);
            return true
        } catch (error) {
            this.logger.error(error);
            console.log('SampleImportProvider@import', error);
            return false;
        }
    }

    async onImportSuccess(analysis: Analysis) {
        const db = await this.mongodbProvider.mongodbConnect();
        let collectionName = this.commonProvider.getMongoCollectionName(analysis.id);
        const collection = db.collection(collectionName);
        if (!collection) {
            this.logger.error(`Collection ${collectionName} not found for analysis ID: ${analysis.id}`);
            return this.onImportError(analysis);
        }

        let pipeCount = [];
        pipeCount.push({ $group: { _id: null, count: { $sum: 1 } } });

        const [count] = await Promise.all([
            collection.aggregate(pipeCount, { allowDiskUse: true }).toArray()
        ]);

        await this.mongodbProvider.mongodbDisconnect();

        let variants = count[0]?.count || 0;
        this.logger.log(`Found ${variants} variants for analysis ID: ${analysis.id}`);
        return await this.analysisRepository.update({ id: analysis.id }, { status: AnalysisStatus.ANALYZED, analyzed: new Date(), variants: variants });
    }

    async onImportError(analysis: Analysis) {
        return await this.analysisRepository.update({ id: analysis.id }, { status: AnalysisStatus.ERROR });
    }

    private async getAnalysisByStatus(status: AnalysisStatus) {
        return await this.analysisRepository.findOne({
            where: {
                status: status
            }
        })
    }
}
