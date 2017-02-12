import { Exam } from './exam';
import { Paper } from './paper';
import { Course } from './course';

export interface Request {
  $key?: string;
  type: RequestType;
  data: Course | Paper | Exam;
  requestedBy: string[];
  createdAt: string;
}

export type RequestType = 'course' | 'paper' | 'exam';
