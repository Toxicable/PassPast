import { Paper } from './paper';
import { Question } from './question';

export interface Exam{
    $key: string;
    year: number;
    semester: string;
    paperId: number;
}

