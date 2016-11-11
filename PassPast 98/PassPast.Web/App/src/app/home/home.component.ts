import { Component } from '@angular/core'
import { Router} from "@angular/router";
import { AlertService} from "../../core/services/alert.service";
import { AuthHttp, tokenNotExpired, JwtHelper} from "angular2-jwt";
import { Observable} from "rxjs/Observable";
import { TokenService} from '../../core/auth/token.service';
import { AppState} from '../app-store';
import { Store} from '@ngrx/store';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
constructor(){}

}