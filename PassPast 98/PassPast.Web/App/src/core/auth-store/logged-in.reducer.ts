import { LoggedInActionTypes, LoggedInActions } from './logged-in.actions';
import { Action } from '@ngrx/store';

const initalState: boolean = false

export const loggedInReducer = (state = initalState, action: Action): boolean => {
    switch (action.type){
        case LoggedInActionTypes.LOGGED_IN:
            return true;

        case LoggedInActionTypes.NOT_LOGGED_IN:
            return false;

        default:
            return state;
    }
};
