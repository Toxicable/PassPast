import { IncrimentType, QuestionType } from '../models'

export interface QuestionSection {
  count: number;
  type: QuestionType;
  incrimentType: IncrimentType;
  subQuestions: QuestionSection[];
}
