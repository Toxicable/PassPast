import { Question } from './question';
import { Vote } from './vote';
import { User } from './user';

export interface Answer{
    $key: string;
    contentOrIncriment: string;
    questionId: number;
    voteValue: number;
    votesSum: number;
    userIdentifier: string;
    createdAt: string;
}
