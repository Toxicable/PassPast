import { Injectable } from '@angular/core';
import {RegisterModel} from '../../+auth/models/register-model';
import {Observable} from 'rxjs';
import {Response, Http} from '@angular/http';
import {LoadingBarService} from '../services/loading-bar.service';
import {HttpExceptionService} from '../services/http-exceptions.service';
import {LoginModel} from '../../+auth/models/login-model';
import {TokenService} from './token.service';
import {AuthApiService} from '../services/auth-api.service';
import {AuthActions} from '../stores/auth.store';
import {ChangePasswordModel} from '../models/change-password';
import {ResetPasswordModel} from '../models/reser-password.model';
import {TokenActions} from '../stores/token.store';
import {ProfileActions} from '../stores/profile.store';
import { Tokens } from '../models/tokens';
import { JwtHelper } from 'angular2-jwt';
import { ProfileModel } from '../models/profile-model';
import { Storage } from '../storage';

@Injectable()
export class AccountService {

    constructor(private loadingBar: LoadingBarService,
                private http: Http,
                private httpExceptions: HttpExceptionService,
                private tokens: TokenService,
                private authApi: AuthApiService,
                private authActions: AuthActions,
                private tokenActions: TokenActions,
                private profileActions: ProfileActions,
                private storage: Storage
    ) { }

    register(data: RegisterModel): Observable<Response> {
        return this.http.post("api/account/create", data)
            .catch( this.httpExceptions.handleError )
    }


    externalRegister(accessToken: string, provider: string){
        return this.http.post(`/api/account/CreateExternal?accessToken=${accessToken}&providerString=${provider}`, {})
            .catch( this.httpExceptions.handleError )
    }

    externalLogin(accessToken: string, provider: string){
        return this.http.post(`/api/account/loginExternal?accessToken=${accessToken}&providerString=${provider}`, {})
            .map( res => res.json())
            .map( (tokens: Tokens) => {
                let jwtHelper: JwtHelper = new JwtHelper();
                this.tokenActions.setTokens(tokens);
                this.authActions.isLoggedIn();

                let profile = jwtHelper.decodeToken(tokens.access_token) as ProfileModel;
                this.profileActions.storeProfile(profile);
                
                this.tokens.scheduleRefresh();

                this.storage.setItem("tokens", JSON.stringify(tokens));
            })
            .catch( this.httpExceptions.handleError )      
    }

    login(user: LoginModel)  {
        return this.tokens.getTokens(user, "password")
            .do(res => this.tokens.scheduleRefresh() )
    }

    sendForgotPassword( data ){
        return this.authApi.post("/account/SendForgotPassword", data)
    }

    changePassword(data: ChangePasswordModel){
        return this.authApi.post("/account/changePassword", data)
    }

    resetPassword(data: ResetPasswordModel){
        return this.authApi.post("/account/resetPassword", data )

    }

    logout(){
        this.tokens.deleteTokens();
        this.tokens.unsubscribeRefresh();

        this.authActions.isNotLoggedIn();
        this.tokenActions.deleteTokens();
        this.profileActions.deleteProfile();
    }

}