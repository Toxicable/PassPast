export interface NormQuestion{
    id: number;
    examId: number;
    incriment: string;
    parentQuestionId: number;
    type: string;
    answers: number[];
    comments: number[]
    subQuestions: number[];
    totalAnswerVotes: number;
}
