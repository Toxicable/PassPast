import { ActionReducer, Action } from '@ngrx/store';

export const loadingBarReducer: ActionReducer<boolean> = (state: boolean = false, action: Action) => {
    switch (action.type){
        case "START_LOADING":
            return true;

        case "DONE_LOADING":
            return false;

        default:
            return state;
    }
}