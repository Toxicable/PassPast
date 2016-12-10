import { Alert }              from '../core/models/alert.model';
import { User } from './+admin/models/user';
import { AuthState, authReducer } from '../core/auth-store/auth.store';
import { CoursesState, coursesReducer } from './courses/courses.store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { usersReducer } from './+admin/users/user-reducer';
import { alertReducer } from '../core/alert/alert.reducer';
import { loadingBarReducer } from '../core/loading-bar/loading-bar.reducer';
import { environment } from '../environments/environment';

export interface AppState {
    users: User[];
    alerts: Alert[];
    auth: AuthState;
    loading: boolean;
    appStarting: boolean;
    courses: CoursesState;
}

const reducers = {
    users: usersReducer,
    alerts: alertReducer,
    loading: loadingBarReducer,
    auth: authReducer,
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
