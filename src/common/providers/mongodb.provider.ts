import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class MongodbProvider {
    private client: MongoClient;

    constructor(
        private readonly configService: ConfigService,
    ) { }

    async mongodbConnect(): Promise<Db> {
        if (!this.client) {
            this.client = new MongoClient(`mongodb://${this.configService.get<string>('MONGO_DB_HOST')}:${this.configService.get<string>('MONGO_DB_PORT')}`);
            await this.client.connect();
        }
        return this.client.db(this.configService.get<string>('MONGO_DB_DATABASE'));
    }

    async mongodbDisconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
            this.client = null;
        }
    }
}
