import { Action } from '@ngrx/store';
import { type } from '../../utilities/action-name-helper';
import { AuthTokenModel, ProfileModel } from './models';
import { Injectable } from '@angular/core';

export const AuthActions = {
  types: {
    LOAD_TOKENS: type('[Auth] Load Token'),
    DELETE_TOKENS: type('[Auth] Delete'),
    LOAD_PROFILE: type('[Auth] Load Profile'),
    DELETE_PROFILE: type('[Auth] Delete Profile'),
    LOGGED_IN: type('[Auth] Logged In'),
    NOT_LOGGED_IN: type('[Auth] Not Logged In'),
    AUTH_READY: type('[Auth] Ready')
  },
  authReady(): Action {
    return {
      type: this.types.AUTH_READY
    };
  },
  loggedIn(): Action {
    return {
      type: this.types.LOGGED_IN
    };
  },
  notLoggedIn(): Action {
    return {
      type: this.types.NOT_LOGGED_IN
    };
  },

  deleteProfile(): Action {
    return {
      type: this.types.DELETE_PROFILE
    };
  },
  loadProfile(payload: ProfileModel): Action {
    return {
      type: this.types.LOAD_PROFILE,
      payload
    };
  },
  deleteTokens(): Action {
    return {
      type: this.types.DELETE_TOKENS
    };
  },
  loadTokens(payload: AuthTokenModel): Action {
    return {
      type: this.types.LOAD_TOKENS,
      payload
    };
  }
}
