import { Smester, QuestionType, IncrimentType } from './question';

export interface Exam {
  $key?: string;
  year: number;
  semester: Smester;
  paperKey: string;
  createdAt: string;
  createdBy: string;
}

export interface ExamForm {
  sections: QuestionSection[];
  year: number;
  semester: Smester;
}

export interface QuestionSection {
  count: number;
  type: QuestionType;
  incrimentType: IncrimentType;
  subQuestions: QuestionSection[];
}
