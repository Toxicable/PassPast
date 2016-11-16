import { ActionReducer, Action } from '@ngrx/store';
import { Alert } from '../../core/models/alert.model';

export const alertsReducer: ActionReducer<Alert[]> = (state: Alert[] = [] as Alert[], action: Action) => {
    switch (action.type){
        case "ADD_ALERT":
            return  [
                ...state,
                action.payload
            ];

        case "REMOVE_ALERT":
            return state.filter( alert =>
                alert.message !== action.payload
            );

        default:
            return state;
    }
}