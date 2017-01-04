import { Action } from '@ngrx/store';
import { LoadingBarActions } from './loading-bar.actions';

const initalState = false;

export function loadingBarReducer(state = initalState, action: Action): boolean {
    switch (action.type) {
        case LoadingBarActions.types.START:
            return true;

        case LoadingBarActions.types.DONE:
            return false;

        default:
            return state;
    }
}
