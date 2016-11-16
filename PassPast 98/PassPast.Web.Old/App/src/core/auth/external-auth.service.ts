import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Logger} from '../logger';
import {AccountService} from './account.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs'

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
            appId      : '311510702571628',
            status     : true,
            cookie     : true,
            xfbml      : false,
            version    : 'v2.8' 
        });

        gapi.load('auth', () => {});
    }

    register(provider: string){
        let accessToken$: Observable<any>;
        if(provider == "Facebook"){
            accessToken$ = this.authorizeFacebook();
        }
        if(provider == "Google"){
            accessToken$ = this.authorizeGoogle();
        }

        return accessToken$.flatMap((accessToken: string) => {
            return this.account.externalRegister(accessToken,provider);
        })
    }
    
    login(provider: string){
        let accessToken$: Observable<any>;
        if(provider == "Facebook"){
            accessToken$ = this.authorizeFacebook();
        }
        if(provider == "Google"){
            accessToken$ = this.authorizeGoogle();
        }

        return accessToken$.flatMap((accessToken: string)=>{
            return this.account.externalLogin(accessToken,provider);
        })
    }

    private authorizeFacebook(): Observable<any> {
        return Observable.create( (observer: Observer<any>) => {
            try{
                FB.login(response => {
                observer.next(response.authResponse.accessToken)
                observer.complete
            },{scope: 'email'})
            }catch(error){
                observer.error(error);
            }        
        });

    }

    private authorizeGoogle(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            try{
                gapi.auth.authorize({
                    client_id: "137170270322-3ik6cl5m55i4ft3ff6t7l9tm2f1abkvh.apps.googleusercontent.com",
                    scope: 'profile'
                }, token => {
                    observer.next(token.access_token)
                    observer.complete()
                });
            }catch(error){
                observer.error(error);
            }
        })          
    }

}
