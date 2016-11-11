import { ActionReducer, combineReducers } from '@ngrx/store';
import * as course from './courses/course.reducer'

export interface State {
    course: course.State,
}


export const reducer: ActionReducer<State> = combineReducers({
    course: course.reducer,
});