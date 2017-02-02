import { Answer } from './answer';
import { Comment } from './comment';

export interface Question {
    $key: string;
    examId: number;
    incriment: string;
    parentQuestionId: number;
    type: string;
    answers: Answer[];
    comments: Comment[]
    subQuestions: Question[];
    totalAnswerVotes: number;
}
