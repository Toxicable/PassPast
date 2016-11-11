import { Question } from './question';
import { ApplicationUser } from './application-user';
import { Vote } from './vote';
export interface Comment{
    id: number;
    content: string;
    votes: Vote[];
    postedAt: Date;
    questionId: number;
    question: Question;
    createdById: string;
    createdBy: ApplicationUser;
}