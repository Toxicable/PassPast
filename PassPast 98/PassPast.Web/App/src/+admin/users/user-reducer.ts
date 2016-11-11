import { ActionReducer, Action } from '@ngrx/store';
import { User } from '../models/user';

export const usersReducer: ActionReducer<User[]> = (state: User[] = [], action: Action) => {
    switch (action.type){
        case "GET_USERS":
            return action.payload;

        default:
        return state;
    }
}