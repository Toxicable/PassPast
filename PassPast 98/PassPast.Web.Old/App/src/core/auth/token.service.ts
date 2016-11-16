import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { LoadingBarService } from '../services/loading-bar.service';
import { HttpExceptionService } from '../services/http-exceptions.service';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { ProfileModel } from '../models/profile-model';
import { LoginModel } from '../../+auth/models/login-model';
import { Storage } from "../storage";
import { Tokens } from '../models/tokens';
import { AlertService } from '../services/alert.service';
import {JwtHelper} from 'angular2-jwt';
import {AuthActions} from '../stores/auth.store';
import {TokenActions} from '../stores/token.store';
import {ProfileActions} from '../stores/profile.store';

@Injectable()
export class TokenService {
    constructor(private storage: Storage,
                private loadingBar: LoadingBarService,
                private http: Http,
                private httpExceptions: HttpExceptionService,
                private store: Store<AppState>,
                private alert: AlertService,
                private authActions: AuthActions,
                private tokenActions: TokenActions,
                private profileActions: ProfileActions
    ) { }

    refreshSubscription$: Subscription;
    jwtHelper: JwtHelper = new JwtHelper();

    getTokens(data: LoginModel | RefreshGrant, grantType: string): Observable<void> {
        //data can be any since it can either be a refresh tokens or login details
        //The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        Object.assign(data, {
            grant_type: grantType,
            client_id: "AngularApp"
        });

        return this.http.post("api/token", this.encodeObjectToParams(data) , options)
            .map( res => res.json())
            .map( (tokens: Tokens) => {
                this.tokenActions.setTokens(tokens);
                this.authActions.isLoggedIn();

                let profile = this.jwtHelper.decodeToken(tokens.access_token) as ProfileModel;
                this.profileActions.storeProfile(profile);

                this.storage.setItem("tokens", JSON.stringify(tokens));
            })
            .do( _ => this.authActions.authReady())
            .catch( error => this.httpExceptions.handleTokenBadRequest(error));

    }

    deleteTokens(){
        this.storage.removeItem("tokens");
        this.tokenActions.deleteTokens();
    }

    unsubscribeRefresh() {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    }

    refreshTokens(): Observable<Response>{
        return this.store.map( state => state.auth.tokens.refresh_token)
            .first()
            .flatMap( refreshToken => {
                return this.getTokens(
                    { refresh_token: refreshToken } as RefreshGrant, "refresh_token")
                    .catch( error => Observable.throw("Session Expired"));
                //pretty sure the only way this can fail is with a expired tokens
            })
    }

    startupTokenRefresh() {
        return this.storage.getItem("tokens")
            .flatMap( (rawTokens: string) => {
                //check if the token is even if localStorage, if it isn't tell them it's not and return
                if(!rawTokens){
                    this.authActions.authReady();
                    return Observable.throw("No token in Storage");
                }
                //parse the token into a model and throw it into the store
                let tokens = JSON.parse(rawTokens) as Tokens;
                this.tokenActions.setTokens(tokens);

                if(!this.jwtHelper.isTokenExpired(tokens.access_token)){
                    //grab the profile out so we can store it
                    let profile = this.jwtHelper.decodeToken(tokens.access_token) as ProfileModel;
                    this.profileActions.storeProfile(profile);

                    //we can let the app know that we're good to go ahead of time
                    this.authActions.isLoggedIn();
                    this.authActions.authReady();
                }

                //it if is able to refresh then the getTokens method will let the app know that we're auth ready
                return this.refreshTokens()
            });
    }

    scheduleRefresh(): void {
        let source = this.store.select( state => state.auth.tokens)
            .take(1)
            .flatMap(tokens => {
                //this is the other method for getting a refresh timer
                // let issued = new Date(tokens[".issued"]).getTime() / 1000;
                // let expires = new Date(tokens[".expires"]).getTime() / 1000;
                //
                // let refreshTokenThreshold = 10; //seconds
                // let delay = ((expires - issued) - refreshTokenThreshold) * 1000;
                // delay = delay > 1800000 ? 1800000 : delay;

                //the token should be new here so that means take half of it's expiry time should be fine
                let delay = tokens["expires_in"] /2 * 1000;
                console.log(delay);
                return Observable.interval(delay);//ms
            });

        this.refreshSubscription$ = source.subscribe(() => {
            console.log("refresh fired");
            this.refreshTokens()
                .subscribe( )
        });
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }

}
export interface RefreshGrant{
    refresh_token: string;
}