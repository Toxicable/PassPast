import { Answer } from './answer';

export interface Question {
    $key?: string;
    examKey: string;
    incriment: IncrimentType;
    answers: Answer[];
    subQuestions: Question[];
    type: QuestionType;
    parentKey?: string;
    createdAt: string;
    createdBy: string;
}

export type IncrimentType = 'alpha' | 'numbered' | 'roman';
export type QuestionType = 'mcq' | 'short';
export type Smester = 'S1' | 'S2' | 'SS';
