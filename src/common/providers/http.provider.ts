import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class HttpProvider {
    private readonly logger = new Logger(HttpProvider.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}

    async getGenebeData(chrom: string, pos: number, ref: string, alt: string, transcript: string, assembly: string): Promise<Record<string, any>> {
        const { data } = await firstValueFrom(
            this.httpService.get<any>(`https://api.genebe.net/cloud/api-public/v1/variant?chr=${chrom}&pos=${pos}&ref=${ref}&alt=${alt}&genome=${assembly}&transcript=${transcript}`, {
                auth: {
                    username: this.configService.get<string>('GENEBE_USERNAME'),
                    password: this.configService.get<string>('GENEBE_API_KEY'),
                }
            }).pipe(
                catchError((error:  AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
                }),
            ),
        );
        return data;
    }

    async searchReferences(pmid: string): Promise<Record<string, any>> {
        const { data } = await firstValueFrom(
            this.httpService.get<any>(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`).pipe(
                catchError((error:  AxiosError) => {
                    this.logger.error(error.response.data);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }
}
