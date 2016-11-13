import { ActionReducer, combineReducers } from '@ngrx/store';
import * as course from './courses/course.reducer';
import * as paper from './papers/paper.reducer';
import * as exam from './exams/exam.reducer';
import * as question from './questions/questions.reducer';

export interface State {
    course: course.State,
    paper: paper.State,
    exam: exam.State,
    question: question.State
}


export const reducer: ActionReducer<State> = combineReducers({
    course: course.reducer,
    paper: paper.reducer,
    exam: exam.reducer,
    question: question.reducer
});