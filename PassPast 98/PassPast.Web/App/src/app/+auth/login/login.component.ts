import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../core';
import { FormValidators } from 'angular-validators';
import { OpenIdClientService } from '@toxicable/oidc';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-login',
  templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: string[];

  constructor(
    private alert: AlertService,
    private oidc: OpenIdClientService,
  ) { }


  ngOnInit(): void {
    //TODO: make login/register same thing
    this.oidc.initExternal();
  }

  facebookAuthorize() {
    this.oidc.login('facebook')
      .subscribe(() => this.alert.sendSuccess('Successfully logged in'))

  }

  googleAuthorize() {
    this.oidc.login('google')
      .subscribe(x => this.alert.sendSuccess('Successfully logged in4'));
  }

  authorizeExternal(provider: string = 'google', client_id: string = environment.googleClientId, redirect_uri: string = 'http://localhost:4200/hey') {

    let providerOAuthMap: { [provider: string]: string } = {
      google: 'https://accounts.google.com/o/oauth2/auth',
      facebook: ''
    };

    let origin = window.location.origin;

    let url = providerOAuthMap[provider] + '?' +
      'client_id=' + encodeURIComponent(client_id) +
      '&scope=profile' +
      '&redirect_uri=' + encodeURIComponent(redirect_uri) +
      '&response_type=token' +
      '&origin=' + encodeURIComponent(origin);

    let oauthWindow = window.open(url, 'OAuthWindow', 'height=600,width=450');

    if (window.focus) {
      oauthWindow.focus();
    }

    let t =  Observable.interval(200)
      .do(() => console.log('check'))
      .map(() => {
        try {
          return oauthWindow.location.href;
        } catch (error) {
          return '';
        }
      })
      .filter(responseUrl => !!responseUrl || !!oauthWindow.closed)
      .filter(responseUrl => responseUrl.startsWith(redirect_uri) || !!oauthWindow.closed)
      .first()
      .do(responseUrl => oauthWindow.close());

    let y = t.flatMap(rUrl => Observable.of(rUrl));
y.subscribe(a => console.info(a))
  }

}
