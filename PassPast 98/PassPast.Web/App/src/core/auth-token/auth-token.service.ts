import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { LoadingBarService } from '../loading-bar/loading-bar.service';
import { HttpExceptionService } from '../services/http-exceptions.service';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { ProfileModel } from '../models/profile-model';
import { LoginModel } from '../models/login-model';
import { Storage } from '../storage';
import { AlertService } from '../alert/alert.service';
import { JwtHelper } from 'angular2-jwt';
import { ExternalLoginModel } from '../models/external-login-model';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from './auth-token.actions';
import { AuthReadyActions } from '../auth-store/auth-ready.actions';
import { ProfileActions } from '../profile/profile.actions';

@Injectable()
export class AuthTokenService {
    refreshSubscription$: Subscription;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private storage: Storage,
                private loadingBar: LoadingBarService,
                private http: Http,
                private httpExceptions: HttpExceptionService,
                private store: Store<AppState>,
                private alert: AlertService,
                private loggedInActions: LoggedInActions,
                private authTokenActions: AuthTokenActions,
                private authReadActions: AuthReadyActions,
                private profileActions: ProfileActions
    ) { }


    getTokens(data: LoginModel | RefreshGrant | ExternalLoginModel, grantType: string): Observable<void> {
        // data can be any since it can either be a refresh tokens or login details
        // The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            scope: ['openid offline_access']
        });

        return this.http.post('/api/connect/token', this.encodeObjectToParams(data) , options)
            .map( res => res.json())
            .map( (tokens: AuthTokenModel) => {
                let now = new Date();
                tokens.expiration_date = new Date(now.getTime() + tokens.expires_in * 1000).getTime().toString();

                this.store.dispatch(this.authTokenActions.Load(tokens));
                this.store.dispatch(this.loggedInActions.LoggedIn());

                let profile = this.jwtHelper.decodeToken(tokens.id_token) as ProfileModel;
                this.store.dispatch(this.profileActions.Load(profile));

                this.storage.setItem('auth-tokens', tokens);
            })
            .do( _ => this.store.dispatch(this.authReadActions.Ready()))
            .catch( error => this.httpExceptions.handleTokenBadRequest(error));

    }

    deleteTokens() {
        this.storage.removeItem('auth-tokens');
        this.store.dispatch(this.authTokenActions.Delete());
    }

    unsubscribeRefresh() {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    }

    refreshTokens(): Observable<Response> {
        return this.store.select( state => state.auth.authTokens.refresh_token)
            .first()
            .flatMap( refreshToken => {
                return this.getTokens(
                    { refresh_token: refreshToken } as RefreshGrant, 'refresh_token')
                    .catch( error => Observable.throw('Session Expired'));
                //  pretty sure the only way this can fail is with a expired tokens
            });
    }

    startupTokenRefresh() {
        return this.storage.getItem('auth-tokens')
            .flatMap( (tokens: AuthTokenModel) => {
                // check if the token is even if localStorage, if it isn't tell them it's not and return
                if (!tokens) {
                    this.store.dispatch(this.authReadActions.Ready());
                    return Observable.throw('No token in Storage');
                }
                // parse the token into a model and throw it into the store
                this.store.dispatch(this.authTokenActions.Load(tokens));

                if (+tokens.expiration_date < new Date().getTime()) {
                    // grab the profile out so we can store it
                    let profile = this.jwtHelper.decodeToken(tokens.id_token) as ProfileModel;
                    this.store.dispatch(this.profileActions.Load(profile));

                    // we can let the app know that we're good to go ahead of time
                    this.store.dispatch(this.loggedInActions.LoggedIn());
                    this.store.dispatch(this.authReadActions.Ready());
                }

                // it if is able to refresh then the getTokens method will let the app know that we're auth ready
                return this.refreshTokens();
            })
            .catch(error => {
                this.store.dispatch(this.loggedInActions.NotLoggedIn());
                this.store.dispatch(this.authReadActions.Ready());
                return Observable.throw(error);
            });
    }

    scheduleRefresh(): void {
        let source = this.store.select( state => state.auth.authTokens)
            .take(1)
            .flatMap((tokens: AuthTokenModel) => {
                let delay = tokens.expires_in / 2 * 1000;
                console.log(delay);
                return Observable.interval(delay);
            });

        this.refreshSubscription$ = source.subscribe(() => {
            console.log('refresh fired');
            this.refreshTokens()
                .subscribe( );
        });
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
