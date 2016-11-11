import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core'
import {Store} from '@ngrx/store';
import {AppState} from './app-store';
import {TokenService} from '../core/auth/token.service';
import {AuthActions} from '../core/stores/auth.store';
import {AlertService} from '../core/services/alert.service';

@Component({
    selector: 'my-app',
    template: `
<loading-bar></loading-bar>
<alert></alert>
<navigation></navigation>
<router-outlet></router-outlet>
`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss', './deeppurple-amber.css']
})
export class AppComponent implements OnInit, OnDestroy{

    constructor(private tokens: TokenService,
                private store: Store<AppState>,
                private authActions: AuthActions,
                private alert: AlertService
    ){    }

    ngOnInit(): void {
        this.tokens.startupTokenRefresh()
            .subscribe(
            () => {
                console.info("startup done");
                // we manage to refresh the tokens so we can carry with the scheduleRefresh
                this.tokens.scheduleRefresh();
            }, error => {
                console.error(error);
                this.authActions.isNotLoggedIn();
                this.authActions.authReady();

                //keep it silent if there's nothing in storage
                if(error != "No token in Storage")
                    this.alert.sendWarning("error");
            })
    }

    ngOnDestroy(): void {
        this.tokens.unsubscribeRefresh();
    }
}