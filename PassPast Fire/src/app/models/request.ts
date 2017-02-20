import { Exam, ExamForm } from './exam';
import { Paper, PaperForm } from './paper';
import { Course, CourseForm } from './course';

export interface Request {
  $key?: string;
  type: RequestType;
  data: FormData;
  requestedBy: string[];
  createdAt: string;
}

export type FormData = CourseForm | PaperForm | ExamForm;
export type RequestType = 'course' | 'paper' | 'exam';
