import { Answer } from './answer';
export interface Question {
    $key?: string;
    examKey: string;
    incriment: 'alpha' | 'numbered' | 'roman';
    answers: Answer[];
    subQuestions: Question[];
    type: 'mcq' | 'short';
    parentKey?: string;
    createdAt: string;
    createdBy: string;
}
