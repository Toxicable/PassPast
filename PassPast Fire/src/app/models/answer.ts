export interface Answer {
    $key?: string;
    contentOrIncriment: string;
    voteValue: number;
    votesSum: number;
    questionKey?: string;
    createdAt: string;
    createdBy: string;
}
