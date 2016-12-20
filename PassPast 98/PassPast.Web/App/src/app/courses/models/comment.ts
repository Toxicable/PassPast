import { Question } from './question';
import { Vote } from './vote';
export interface Comment{
    id: number;
    content: string;
    totalVotes: Vote[];
    createdAt: string;
}
