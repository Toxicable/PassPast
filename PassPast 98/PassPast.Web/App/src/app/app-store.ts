import { StoreModule }        from '@ngrx/store';
//models
import { User }               from '../+admin/models/user';
import { Alert }              from '../core/models/alert.model';
//reducers
import { usersReducer }       from '../+admin/users/user-reducer';
import { authReducer, AuthState }  from '../core/auth-store/auth.store';
import { loadingBarReducer } from '../core/loading-bar/loading-bar.reducer';
import { alertReducer } from '../core/alert/alert.reducer';

export interface AppState{
    users: User[],
    alerts: Alert[],
    auth: AuthState,
    loading: boolean,
    appStarting: boolean,
}

export const appStore = StoreModule
    .provideStore({
        users: usersReducer,
        alerts: alertReducer,
        loading: loadingBarReducer,
        auth: authReducer
    }
);
