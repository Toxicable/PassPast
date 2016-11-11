import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Logger} from '../logger';
import {ExternalRegistrationModel} from '../models/external-registration-model';
import {AccountService} from './account.service';

declare let FB: any;
declare let gapi: any;

@Injectable()
export class ExternalAuthService {

    constructor(private http: Http,
                private logger: Logger,
                private account: AccountService
    ) {}

    init(){
        FB.init({
            appId      : '',
            status     : true,
            cookie     : true,
            xfbml      : false,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.5
        });

        gapi.load('auth2', () => {

            gapi.auth2.init({
                client_id: '',
                scope: 'profile'
            })

        })
    }

    authorizeFacebook() {
        //TODO: make these into observables
        FB.login(response => {
            FB.api('/me',  { locale: 'en_US', fields: 'first_name,last_name,email' }, next =>{

                //noinspection TypeScriptUnresolvedVariable
                this.register({
                    accessToken: response.authResponse.accessToken,
                    providerId: next.id,
                    email: next.email,
                    provider: "facebook",
                    firstName: next.first_name,
                    lastName: next.last_name
                } as ExternalRegistrationModel)
            })
        },{scope: 'email'});
    }

    authorizeGoogle() {

        let auth = gapi.auth2.getAuthInstance();

        auth.signIn().then((response) =>{

            this.register({
                accessToken: response.Zi.access_token,
                providerId: response.w3.Eea,
                email: response.w3.U3,
                provider: "google",
                firstName: response.w3.ofa,
                lastName: response.w3.wea
            } as ExternalRegistrationModel)
        })
    }

    private register(model: ExternalRegistrationModel){
        this.account.externalRegister(model)
            .subscribe( res => console.log(res))
    }


}
