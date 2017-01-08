import { Alert, alertReducer, loadingBarReducer } from './core';
import { CoursesState, coursesReducer } from './courses/courses.store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { environment } from '../environments/environment';

export interface AppState {
  alerts: Alert[];
  loading: boolean;
  appStarting: boolean;
  courses: CoursesState;
}

const reducers = {
  alerts: alertReducer,
  loading: loadingBarReducer,
  courses: coursesReducer
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function appReducer(state: any, action: any) {
  return productionReducer(state, action);
  // if (environment.production) {
  //   return productionReducer(state, action);
  // }
  // else {
  //   return developmentReducer(state, action);
  // }
}
