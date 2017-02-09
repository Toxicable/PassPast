import { Smester } from './question';

export interface Exam {
    $key?: string;
    year: number;
    semester: Smester;
    paperKey: string;
    createdAt: string;
    createdBy: string;
}
