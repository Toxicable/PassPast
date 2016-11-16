import { ActionReducer, Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../../app/app-store';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { AuthTokenActionTypes, AuthTokenActions } from './auth-token.actions';

const initalState: AuthTokenModel ={
    id_token: null,
    access_token: null,
    refresh_token: null,
    expires_in: 0,
    token_type: null
}

export const authTokenReducer = (state = initalState, action: Action): AuthTokenModel => {
    switch (action.type){
        case AuthTokenActionTypes.LOAD:
            return action.payload;

        case AuthTokenActionTypes.DELETE:
            return initalState;

        default:
            return state;
    }
};