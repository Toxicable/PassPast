import { Paper } from './paper';
import { Question } from './question';

export interface Exam{
    id: number;
    year: number;
    semester: string;
    paperId: number;
    paper: Paper;
    questions: Question[];
    createdById: number;
    createdBy: string;
}

