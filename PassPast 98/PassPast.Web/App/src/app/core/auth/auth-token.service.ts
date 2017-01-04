import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { AppState } from '../../app-store';
import { Store } from '@ngrx/store';
import { ProfileModel, ExternalLoginModel, AuthTokenModel } from './models';
import { Storage } from '../storage';
import { AlertService } from '../alert/alert.service';
import { JwtHelper } from 'angular2-jwt';
import { AuthHttp } from './auth-http.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthTokenService {
  refreshSubscription$: Subscription;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private storage: Storage,
    private authHttp: AuthHttp,
    private store: Store<AppState>,
    private alert: AlertService,
  ) { }


  getTokens(data: RefreshGrant | ExternalLoginModel, grantType: string): Observable<boolean> {
    // data can be any since it can either be a refresh tokens or login details
    // The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    Object.assign(data, {
      grant_type: grantType,
      scope: ['openid offline_access']
    });

    return this.authHttp.post('/connect/token', this.encodeObjectToParams(data), options)
      .do((tokens: AuthTokenModel) => {
        let now = new Date();
        tokens.expiration_date = new Date(now.getTime() + tokens.expires_in * 1000).getTime().toString();

        this.store.dispatch(AuthActions.loadTokens(tokens));
        this.store.dispatch(AuthActions.loggedIn());

        let profile = this.jwtHelper.decodeToken(tokens.id_token) as ProfileModel;
        this.store.dispatch(AuthActions.loadProfile(profile));

        this.storage.setItem('auth-tokens', tokens);
        this.store.dispatch(AuthActions.authReady());
        return true;
      });
  }

  deleteTokens() {
    this.storage.removeItem('auth-tokens');
    this.store.dispatch(AuthActions.deleteTokens());
  }

  unsubscribeRefresh() {
    if (this.refreshSubscription$) {
      this.refreshSubscription$.unsubscribe();
    }
  }

  refreshTokens(): Observable<Response> {
    return this.store.select(state => state.auth.tokens)
      .first()
      .flatMap(tokens => {
        return this.getTokens(
          { refresh_token: tokens.refresh_token } as RefreshGrant, 'refresh_token')
          .catch(error => Observable.throw('Session Expired'));
        //  pretty sure the only way this can fail is with a expired tokens
      });
  }

  startupTokenRefresh() {
    return this.storage.getItem('auth-tokens')
      .flatMap((tokens: AuthTokenModel) => {
        // check if the token is even if localStorage, if it isn't tell them it's not and return
        if (!tokens) {
          this.store.dispatch(AuthActions.authReady());
          return Observable.throw('No token in Storage');
        }
        // parse the token into a model and throw it into the store
        this.store.dispatch(AuthActions.loadTokens(tokens));

        if (+tokens.expiration_date < new Date().getTime()) {
          // grab the profile out so we can store it
          let profile = this.jwtHelper.decodeToken(tokens.id_token) as ProfileModel;
          this.store.dispatch(AuthActions.loadProfile(profile));

          // we can let the app know that we're good to go ahead of time
          this.store.dispatch(AuthActions.loggedIn());
          this.store.dispatch(AuthActions.authReady());
        }

        // it if is able to refresh then the getTokens method will let the app know that we're auth ready
        return this.refreshTokens();
      })
      .catch(error => {
        this.store.dispatch(AuthActions.notLoggedIn());
        this.store.dispatch(AuthActions.authReady());
        console.info(error);
        return Observable.throw(error);
      });
  }

  scheduleRefresh(): void {
    let source = this.store.select(state => state.auth.tokens)
      .take(1)
      .flatMap((tokens: AuthTokenModel) => {
        let delay = tokens.expires_in / 2 * 1000;
        console.log(delay);
        return Observable.interval(delay);
      });

    this.refreshSubscription$ = source
      .flatMap(() => this.refreshTokens())
      .subscribe();
  }

  private encodeObjectToParams(obj: any): string {
    return Object.keys(obj)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }

}
export interface RefreshGrant {
  refresh_token: string;
}
