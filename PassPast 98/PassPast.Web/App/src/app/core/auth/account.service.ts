import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Http } from '@angular/http';
import { LoadingBarService } from '../loading-bar/loading-bar.service';
import { ExternalRegistrationModel } from './models';
import { ExternalLoginModel } from './models';
import { AuthTokenService } from './auth-token.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';
import { AuthHttp } from './auth-http.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AccountService {

    constructor(private loadingBar: LoadingBarService,
                private http: Http,
                private authHttp: AuthHttp,
                private authTokens: AuthTokenService,
                private store: Store<AppState>,
    ) { }

    externalRegister(model: ExternalRegistrationModel) {
        return this.http.post('/api/account/registerexternal', model);
    }

    externalLogin(model: ExternalLoginModel) {
        return this.authTokens.getTokens(model, 'urn:ietf:params:oauth:grant-type:external_identity_token')
            .do(() => this.authTokens.scheduleRefresh());
    }

    logout() {
        this.authTokens.deleteTokens();
        this.authTokens.unsubscribeRefresh();

        this.store.dispatch(AuthActions.notLoggedIn());
        this.store.dispatch(AuthActions.deleteTokens());
        this.store.dispatch(AuthActions.deleteProfile());
    }

}
