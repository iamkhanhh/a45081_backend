import { Controller, Get, Post, Delete, Body, Param, Request, ParseIntPipe, Sse } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Observable, Subject } from 'rxjs';

interface MessageEvent {
    data: string | object;
}

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }

    @Post('conversations')
    @ApiOperation({ summary: 'Create a new conversation' })
    @ApiResponse({ status: 201, description: 'Conversation created successfully' })
    create(@Body() dto: CreateConversationDto, @Request() req) {
        return this.chatbotService.createConversation(req.user.id, dto);
    }

    @Get('conversations')
    @ApiOperation({ summary: 'Get all conversations of current user' })
    @ApiResponse({ status: 200, description: 'Conversations retrieved successfully' })
    findAll(@Request() req) {
        return this.chatbotService.getConversations(req.user.id);
    }

    @Get('conversations/:id/messages')
    @ApiOperation({ summary: 'Get messages of a conversation' })
    @ApiParam({ name: 'id', example: 1, description: 'Conversation ID' })
    @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Conversation not found' })
    getMessages(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.chatbotService.getMessages(id, req.user.id);
    }

    @Post('conversations/:id/messages')
    @ApiOperation({ summary: 'Send a message and get a pending message ID for streaming' })
    @ApiParam({ name: 'id', example: 1, description: 'Conversation ID' })
    @ApiResponse({ status: 201, description: 'Message queued, use messageId to stream response' })
    @ApiResponse({ status: 404, description: 'Conversation not found' })
    async sendMessage(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: SendMessageDto,
        @Request() req,
    ) {
        return this.chatbotService.queueMessage(id, req.user.id, dto.content);
    }

    @Sse('conversations/:id/messages/:messageId/stream')
    @ApiOperation({ summary: 'Stream AI response for a pending message via SSE' })
    @ApiParam({ name: 'id', example: 1, description: 'Conversation ID' })
    @ApiParam({ name: 'messageId', description: 'Pending message ID from POST' })
    streamMessage(
        @Param('id', ParseIntPipe) id: number,
        @Param('messageId') messageId: string,
        @Request() req,
    ): Observable<MessageEvent> {
        const subject = new Subject<MessageEvent>();

        this.chatbotService
            .streamMessage(id, req.user.id, messageId)
            .then(async (stream) => {
                let fullResponse = '';

                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    if (content) {
                        fullResponse += content;
                        subject.next({ data: JSON.stringify({ content }) });
                    }
                }

                await this.chatbotService.saveAssistantMessage(id, fullResponse);

                subject.next({ data: JSON.stringify({ done: true }) });
                subject.complete();
            })
            .catch((error) => {
                subject.next({ data: JSON.stringify({ error: error.message }) });
                subject.complete();
            });

        return subject.asObservable();
    }

    @Delete('conversations/:id')
    @ApiOperation({ summary: 'Delete a conversation and its messages' })
    @ApiParam({ name: 'id', example: 1, description: 'Conversation ID' })
    @ApiResponse({ status: 200, description: 'Conversation deleted successfully' })
    @ApiResponse({ status: 404, description: 'Conversation not found' })
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.chatbotService.deleteConversation(id, req.user.id);
    }
}
