import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ChatConversations } from '@/entities/chat_conversations.entity';
import { MongodbProvider } from '@/common/providers/mongodb.provider';
import { CreateConversationDto } from './dto/create-conversation.dto';
import OpenAI from 'openai';
import { Db, ObjectId } from 'mongodb';

const SYSTEM_PROMPT = `You are a specialized bioinformatics and genetics assistant for a genomic analysis platform.

Your expertise covers:
- Molecular biology: DNA, RNA, proteins, gene expression, mutations
- Genomics: genome structure, chromosomes, sequencing technologies (WGS, WES)
- Bioinformatics: sequence alignment, variant calling, annotation, pipelines
- File formats: VCF, FASTQ, BAM/SAM, BED, FASTA, GFF/GTF
- Tools: VEP, BWA, SAMtools, BCFtools, ANNOVAR, BEDTools, GATK
- Databases: ClinVar, HGMD, COSMIC, OMIM, gnomAD, dbSNP
- Clinical genetics: pathogenicity classification (ACMG), genetic diseases, pharmacogenomics
- Statistical genetics: allele frequency, Hardy-Weinberg, GWAS, linkage analysis

IMPORTANT RULES:
1. ONLY answer questions related to biology, genetics, genomics, bioinformatics, and related medical/scientific topics.
2. If the user asks about topics OUTSIDE this scope (e.g., cooking, programming unrelated to bioinformatics, politics, entertainment, etc.), respond EXACTLY with:
   "Xin lỗi, câu hỏi này nằm ngoài phạm vi chuyên môn của tôi. Tôi chỉ có thể hỗ trợ các vấn đề liên quan đến sinh học, di truyền học, tin sinh học và phân tích gen. Bạn có câu hỏi nào trong lĩnh vực này không?"
3. Answer in the same language the user uses.
4. Provide accurate, educational responses suitable for both beginners and professionals.
5. When explaining concepts, use examples relevant to this genomic analysis platform when possible.`;

const CONTEXT_MESSAGE_LIMIT = 20;

@Injectable()
export class ChatbotService implements OnModuleInit {
    private openai: OpenAI;
    private mongoDb: Db;
    private collectionName: string;

    constructor(
        @InjectRepository(ChatConversations)
        private conversationRepository: Repository<ChatConversations>,
        private readonly mongodbProvider: MongodbProvider,
        private readonly configService: ConfigService,
    ) { }

    async onModuleInit() {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
        });

        this.mongoDb = await this.mongodbProvider.mongodbConnect();
        this.collectionName = this.configService.get<string>('MONGO_CHAT_COLLECTION');

        await this.mongoDb.collection(this.collectionName).createIndex(
            { conversationId: 1, createdAt: -1 }
        );
    }

    async createConversation(userId: number, dto: CreateConversationDto) {
        const conversation = this.conversationRepository.create({
            user_id: userId,
            title: dto.title || 'New conversation',
        });
        await this.conversationRepository.save(conversation);

        return {
            status: 'success',
            message: 'Conversation created successfully',
            data: conversation,
        };
    }

    async getConversations(userId: number) {
        const conversations = await this.conversationRepository.find({
            where: { user_id: userId },
            order: { updatedAt: 'DESC' },
        });

        return {
            status: 'success',
            message: 'Conversations retrieved successfully',
            data: conversations,
        };
    }

    async getMessages(conversationId: number, userId: number) {
        await this.validateConversationOwner(conversationId, userId);

        const messages = await this.mongoDb
            .collection(this.collectionName)
            .find({ conversationId })
            .sort({ createdAt: 1 })
            .toArray();

        return {
            status: 'success',
            message: 'Messages retrieved successfully',
            data: messages,
        };
    }

    async queueMessage(conversationId: number, userId: number, content: string) {
        await this.validateConversationOwner(conversationId, userId);

        const result = await this.mongoDb.collection(this.collectionName).insertOne({
            conversationId,
            role: 'user',
            content,
            createdAt: new Date(),
        });

        const messageCount = await this.mongoDb
            .collection(this.collectionName)
            .countDocuments({ conversationId });

        if (messageCount === 1) {
            const title = content.length > 50 ? content.substring(0, 50) + '...' : content;
            await this.conversationRepository.update(conversationId, { title });
        }

        await this.conversationRepository.update(conversationId, {});

        return {
            status: 'success',
            message: 'Message queued successfully',
            data: { messageId: result.insertedId.toString() },
        };
    }

    async streamMessage(conversationId: number, userId: number, messageId: string) {
        await this.validateConversationOwner(conversationId, userId);

        const pendingMessage = await this.mongoDb
            .collection(this.collectionName)
            .findOne({ _id: new ObjectId(messageId) });

        if (!pendingMessage) {
            throw new NotFoundException('Message not found');
        }

        const recentMessages = await this.mongoDb
            .collection(this.collectionName)
            .find({ conversationId })
            .sort({ createdAt: -1 })
            .limit(CONTEXT_MESSAGE_LIMIT)
            .toArray();

        recentMessages.reverse();

        const openaiMessages: OpenAI.ChatCompletionMessageParam[] = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...recentMessages.map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content as string,
            })),
        ];

        const stream = await this.openai.chat.completions.create({
            model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
            messages: openaiMessages,
            stream: true,
        });

        return stream;
    }

    async saveAssistantMessage(conversationId: number, content: string) {
        await this.mongoDb.collection(this.collectionName).insertOne({
            conversationId,
            role: 'assistant',
            content,
            createdAt: new Date(),
        });
    }

    async deleteConversation(conversationId: number, userId: number) {
        await this.validateConversationOwner(conversationId, userId);

        await this.mongoDb.collection(this.collectionName).deleteMany({ conversationId });

        await this.conversationRepository.delete(conversationId);

        return {
            status: 'success',
            message: 'Conversation deleted successfully',
        };
    }

    private async validateConversationOwner(conversationId: number, userId: number): Promise<ChatConversations> {
        const conversation = await this.conversationRepository.findOne({
            where: { id: conversationId, user_id: userId },
        });

        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }

        return conversation;
    }
}
