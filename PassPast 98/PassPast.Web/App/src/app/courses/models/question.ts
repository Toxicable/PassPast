import { Answer } from './answer';
import { QuestionType } from './question-type';

export interface Question {
    id: number;
    examId: number;
    incriment: string;
    type: QuestionType;
    answers: Answer[];
    subQuestions: Question[];
}
