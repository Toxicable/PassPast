import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../../core/alert/alert.service";
import {Observable} from "rxjs/Observable";
import {AppState} from '../app-store';
import {Store} from '@ngrx/store';
import { AuthTokenService } from '../../core/auth-token/auth-token.service';
import { AuthHttp } from '../../core/auth-http/auth-http.service';
import { Storage } from '../../core/storage';


        declare let $: any;
@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
constructor(    private router: Router,
                // private alertService: AlertService,
                // private tokens: AuthTokenService,
                // private store: Store<AppState>,
                // private authHttp: AuthHttp,
                // private storage: Storage
    ){}

}