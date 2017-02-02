import { Course } from './course';
import { Exam } from './exam';
export interface Paper{
    $key: string;
    name: string;
    courseId: number;
}
