import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class ChatConversations extends AbstractEntity {
    @Column()
    title: string;

    @Column()
    user_id: number;
}