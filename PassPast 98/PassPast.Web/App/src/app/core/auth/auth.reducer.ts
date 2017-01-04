import { AuthActions } from './auth.actions';
import { AuthTokenModel, ProfileModel, AuthState } from './models';
import { Action } from '@ngrx/store';

const initalState: AuthState = {
  tokens: null,
  profile: null,
  loggedIn: false,
  authReady: false
};

export function authReducer(state = initalState, action: Action): AuthState {
  switch (action.type) {
    case AuthActions.types.LOAD_TOKENS:
      return {
        tokens: action.payload,
        profile: state.profile,
        loggedIn: state.loggedIn,
        authReady: state.authReady
      };

    case AuthActions.types.DELETE_TOKENS:
      return {
        tokens: null,
        profile: state.profile,
        loggedIn: state.loggedIn,
        authReady: state.authReady
      };

    case AuthActions.types.LOAD_PROFILE:
      return {
        tokens: state.tokens,
        profile: action.payload,
        loggedIn: state.loggedIn,
        authReady: state.authReady
      };

    case AuthActions.types.DELETE_PROFILE:
      return {
        tokens: state.tokens,
        profile: null,
        loggedIn: state.loggedIn,
        authReady: state.authReady
      };

    case AuthActions.types.LOGGED_IN:
      return {
        tokens: state.tokens,
        profile: state.profile,
        loggedIn: true,
        authReady: state.authReady
      };

    case AuthActions.types.NOT_LOGGED_IN:
      return {
        tokens: state.tokens,
        profile: state.profile,
        loggedIn: false,
        authReady: state.authReady
      };

    case AuthActions.types.AUTH_READY:
      return {
        tokens: state.tokens,
        profile: state.profile,
        loggedIn: state.loggedIn,
        authReady: true
      };

    default:
      return state;
  }
}
