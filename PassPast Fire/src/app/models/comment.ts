export interface Comment {
    $key: string;
    questionKey: number;
    content: string;
    voteValue: number;
    votesSum: number;
    createdAt: string;
    createdBy: string;
}
