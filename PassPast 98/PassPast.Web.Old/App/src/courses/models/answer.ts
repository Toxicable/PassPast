import { AnswerType } from './answer-type';
import { Question } from './question';
import { Vote } from './vote';

export interface Answer{
    id: number;
    name: string;
    votes: Vote[];
    typeId: number;
    type: AnswerType;
    questionId: number;
    question: Question
}