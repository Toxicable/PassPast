import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../../core/alert/alert.service";
import {Observable} from "rxjs/Observable";
import {AppState} from '../app-store';
import {Store} from '@ngrx/store';
import { AuthTokenService } from '../../core/auth-token/auth-token.service';
import { AuthHttp } from '../../core/auth-http/auth-http.service';


        declare let $: any;
@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
constructor(    private router: Router,
                private alertService: AlertService,
                private tokens: AuthTokenService,
                private store: Store<AppState>,
                private authHttp: AuthHttp
    ){}

    testAuth() {
        this.authHttp.get("api/values")
            .subscribe(
                x => this.alertService.sendSuccess("all goods"),
                error => this.alertService.sendWarning(error)
            )
    }

    hub: any
    messages: string[] = ["Testa 1", "test 2"];

    connect(){
        this.hub = $.connection.echoHub;
        $.connection.hub.logging = true;
        this.hub.client.broadCast = (message: string) => {
            console.log(this.messages)
            this.messages.push(message)
        }

        $.connection.hub.start().done(() => {
            console.log("Connected")
        })
    }

    echo(){        
        this.hub.server.broadcast("I am number 1");
    }


    refreshTokens() {
        this.tokens.refreshTokens()
            .subscribe()
    }

}