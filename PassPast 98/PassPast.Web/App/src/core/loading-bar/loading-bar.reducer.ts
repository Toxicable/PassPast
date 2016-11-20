import { ActionReducer, Action } from '@ngrx/store';
import { Alert } from '../../core/models/alert.model';
import * as loadingBarActions from './loading-bar.actions';
import { LoadingBarActionTypes } from './loading-bar.actions';

const initalState: boolean = false;

export function loadingBarReducer(state = initalState, action: Action): boolean{
    switch (action.type){
        case LoadingBarActionTypes.START:
            return true;

        case LoadingBarActionTypes.DONE:
            return false;

        default:
            return state;
    }
};