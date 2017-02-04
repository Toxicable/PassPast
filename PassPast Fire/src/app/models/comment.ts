export interface Comment {
    $key?: string;
    questionKey: string;
    content: string;
    voteValue: number;
    votesSum: number;
    createdAt: string;
    createdBy: string;
}
