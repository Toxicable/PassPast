import { Alert }              from '../core/models/alert.model';
import { User } from './+admin/models/user';
import { AuthState } from '../core/auth-store/auth.store';
import { coursesReducer } from './courses/courses.store';

export interface AppState {
    users: User[];
    alerts: Alert[];
    auth: AuthState;
    loading: boolean;
    appStarting: boolean;
    courses: coursesReducer;
}
