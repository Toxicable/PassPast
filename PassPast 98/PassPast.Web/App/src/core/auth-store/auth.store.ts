import { ActionReducer, Action, Store, combineReducers } from '@ngrx/store';
import { ProfileModel } from '../models/profile-model';
import { Injectable } from '@angular/core';
import { AppState } from '../../app/app-store';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { profileReducer } from '../profile/profile.reducer';
import { authTokenReducer } from '../auth-token/auth-token.reducer';
import { authReadyReducer } from './auth-ready.reducer';
import { loggedInReducer } from './logged-in.reducer';

export interface AuthState{
    authTokens: AuthTokenModel,
    profile: ProfileModel,
    loggedIn: boolean,
    authReady: boolean
}


export const authReducer: ActionReducer<AuthState> = combineReducers({
    profile: profileReducer,
    authTokens: authTokenReducer,
    loggedIn: loggedInReducer,
    authReady: authReadyReducer
});