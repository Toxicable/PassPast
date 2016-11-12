import { ActionReducer, combineReducers } from '@ngrx/store';
import * as course from './courses/course.reducer';
import * as paper from './papers/paper.reducer';

export interface State {
    course: course.State,
    paper: paper.State
}


export const reducer: ActionReducer<State> = combineReducers({
    course: course.reducer,
    paper: paper.reducer
});