export interface Exam {
    $key?: string;
    year: number;
    semester: 'S1' | 'S2' | 'SS';
    paperKey: string;
    createdAt: string;
    createdBy: string;
}

