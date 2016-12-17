import { AnswerType } from './answer-type';
import { Question } from './question';
import { Vote } from './vote';

export interface Answer{
    id: number;
    contentOrIncriment: string;
    totalVotes: number;
    questionId: number;
}
