import { Question } from './question';
import { Vote } from './vote';
import { User } from './user';

export interface Comment{
    id: number;
    content: string;
    questionId: number;
    createdAt: string;
    hasVoted: boolean;
    votesSum: number;
    createdBy: User;
}
