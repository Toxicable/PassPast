export interface QuestionSection {
  count: number;
  type: 'mcq' | 'short';
  incrimentType: 'alpha' | 'numbered' | 'roman';
  subQuestions: QuestionSection[];
}
