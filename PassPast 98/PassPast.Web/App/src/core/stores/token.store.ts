import {ActionReducer, Action, Store} from '@ngrx/store';
import {Tokens} from '../models/tokens'
import {Injectable} from '@angular/core';
import {AppState} from '../../app/app-store';

const initialState = {} as Tokens;

@Injectable()
export class TokenActions{
    constructor(private store: Store<AppState>){}

    setTokens(tokens: Tokens){
        this.store.dispatch({type: "GET_TOKENS", payload: tokens})
    }

    deleteTokens(){
        this.store.dispatch({type: "DELETE_TOKENS"})
    }
}

export const tokensReducer: ActionReducer<Tokens> = (state: Tokens = initialState, action: Action) => {
    switch (action.type){
        case "GET_TOKENS":
            return action.payload;

        case "DELETE_TOKENS":
            return initialState;

        default:
            return state;
    }
}