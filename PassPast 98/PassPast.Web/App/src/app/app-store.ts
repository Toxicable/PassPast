import { StoreModule }       from '@ngrx/store';
//models
import { User }              from '../+admin/models/user';
import { Alert }             from '../core/models/alert.model';
//reducers
import { alertsReducer }     from '../shared/alert/alert.reducer';
import { loadingBarReducer } from '../shared/loading-bar/loading-bar.reducer';
import { usersReducer }      from '../+admin/users/user-reducer';
import { authReducer, Auth } from '../core/stores/auth.store';

import * as courses from '../courses/courses.store'

export interface AppState{
    users: User[],
    alerts: Alert[],
    auth: Auth,
    loading: boolean,
    appStarting: boolean,
    courses: courses.State
}

export const providedStore = StoreModule
    .provideStore({
        users: usersReducer,
        alerts: alertsReducer,
        loading: loadingBarReducer,
        auth: authReducer,
        courses: courses.reducer
    });