import { SemesterType } from './semester-type';

export interface Exam {
    $key?: string;
    year: number;
    semester: SemesterType;
    paperKey: string;
    createdAt: string;
    createdBy: string;
}

