import { Answer } from './answer';
import { Exam } from './exam';
export interface Question{
    id: number;
    number: number;
    answers: Answer[];
    examId: number;
    exam: Exam
    comments: Comment[];
}