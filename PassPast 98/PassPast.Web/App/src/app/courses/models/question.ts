import { Answer } from './answer';
export interface Question {
    id: number;
    incriment: string;
    type: string;
    answers: Answer[];
    subQuestions: Question[];
}
