import * as course from './reducers/course'
import { ActionReducer, combineReducers } from '@ngrx/store';

export interface State {
    course: course.State
}


export const reducer: ActionReducer<State> = combineReducers({
    course: course.reducer,
});