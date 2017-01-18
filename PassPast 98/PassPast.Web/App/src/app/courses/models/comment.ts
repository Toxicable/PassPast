import { Question } from './question';
import { Vote } from './vote';
import { User } from './user';

export interface Comment{
    id: number;
    content: string;
    totalVotes: Vote[];
    createdAt: string;
    createdBy: User;
}
