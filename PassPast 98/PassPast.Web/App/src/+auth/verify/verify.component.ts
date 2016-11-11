import {Component, OnInit} from "@angular/core";
import {ProfileService} from "../../core/profile/profile.service";
import {AlertService} from "../../core/services/alert.service";
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {LoadingBarService} from "../../core/services/loading-bar.service";
import {AuthHttp} from "angular2-jwt";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import {TokenService} from '../../core/auth/token.service';

@Component({
    selector: 'verify',
    templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit{
    constructor(private profile: ProfileService,
                private authHttp: AuthHttp,
                private alert: AlertService,
                private route: ActivatedRoute,
                private http: Http,
                private loadingBar: LoadingBarService,
                private tokens: TokenService,
                private store: Store<AppState>
    ){}
    ngOnInit(): void {

        if(!this.profile.isEmailConfirmed()){
            let code = this.route.snapshot.queryParams['code'];
            let id = this.route.snapshot.queryParams['userId'];
            if(code && id){
                this.confirmEmail(code, id)
            }else{
                this.sendConfirmationEmail();
            }
        }
    }

    confirmEmail(code: string, id: string): void{
        code = encodeURIComponent(code);

        this.http.get("api/account/ConfirmEmail?userId=" + id + "&code=" + code)
            .subscribe(
                (res) => {
                    this.tokens.refreshTokens()
                        .subscribe(
                        () => this.alert.sendSuccess("Your email has been confirmed"),
                        (res) => this.alert.sendError("an error occured soz")
                    );
                },
                (res) => this.alert.sendError("an error occured soz")
        )
    }

    sendConfirmationEmail(): void{
        this.loadingBar.load()

        this.authHttp.get("api/account/SendConfirmEmail")
            .subscribe(
                () => this.alert.sendSuccess("A confirmation email has been send"),
                (error) => this.alert.sendError(error),
                () => this.loadingBar.done()
        )
    }

}