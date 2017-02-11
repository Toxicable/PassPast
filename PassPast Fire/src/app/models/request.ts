import { Exam } from './exam';
import { Paper } from './paper';
import { Course } from './course';

export interface Request {
  type: RequestType;
  data: Course | Paper | Exam;
  createdBy: string;
  createdAt: string;
}

export type RequestType = 'course' | 'paper' | 'exam';
