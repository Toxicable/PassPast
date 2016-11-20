import { AuthReadyActionTypes } from './auth-ready.actions';
import { Action } from '@ngrx/store';

const initalState: boolean = false

export const authReadyReducer = (state = initalState, action: Action): boolean => {
    switch (action.type){
        case AuthReadyActionTypes.READY:
            return true;
            
        default:
            return state;
    }
};
