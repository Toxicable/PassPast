import { Question } from './question';
import { ApplicationUser } from './application-user';
import { Vote } from './vote';
export interface Comment{
    id: number;
    content: string;
    totalVotes: Vote[];
}
