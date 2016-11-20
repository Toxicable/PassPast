import { AnswerType } from './answer-type';
import { Question } from './question';
import { Vote } from './vote';

export interface Answer{
    id: number;
    name: string;
    typeId: number;
    type: AnswerType;
    questionId: number;
}