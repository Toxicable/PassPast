import { Dict } from './dict';
import { Vote } from './vote';

export interface Answer {
    $key?: string;
    contentOrIncriment: string;
    questionKey?: string;
    createdAt: string;
    createdBy: string;
    votes: Vote[] | Dict<Vote>;
    userVoteValue: number;
    voteSum: number;
}
