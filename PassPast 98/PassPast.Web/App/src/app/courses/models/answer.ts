import { Question } from './question';
import { Vote } from './vote';
import { User } from './user';

export interface Answer{
    id: number;
    contentOrIncriment: string;
    totalVotes: number;
    questionId: number;
    createdAt: string;
    createdBy: User;
}
