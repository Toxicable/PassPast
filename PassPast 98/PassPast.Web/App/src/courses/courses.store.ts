import { ActionReducer, combineReducers } from '@ngrx/store';
import { ExamState, examReducer } from './exams/exam.reducer';
import { PaperState, paperReducer } from './papers/paper.reducer';
import { CourseState, courseReducer } from './courses/course.reducer';
import { QuestionState, questionReducer } from './questions/question.reducer';

export interface State {
    course: CourseState,
    paper: PaperState,
    exam: ExamState,
    question: QuestionState
}


export const reducer: ActionReducer<State> = combineReducers({
    course: courseReducer,
    paper: paperReducer,
    exam: examReducer,
    question: questionReducer
});