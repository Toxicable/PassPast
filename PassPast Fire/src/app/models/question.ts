import { Answer } from './answer';
import { QuestionType } from './question-type';
import { IncrimentType } from './incriment-types';
export interface Question {
    $key?: string;
    examKey: string;
    incriment: 'alpha' | 'numbered' | 'roman';
    answers: Answer[];
    subQuestions: Question[];
    type: 'mcq' | 'short';
    createdAt: string;
    createdBy: string;
}
