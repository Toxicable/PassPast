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

  ngOnInit(){

  }

  facebookAuthorize() {
    this.oidc.login('facebook')
      .subscribe(() => this.alert.sendSuccess('Successfully logged in'))

  }

  googleAuthorize() {
    this.oidc.login('google')
      .subscribe(x => this.alert.sendSuccess('Successfully logged in4'));
  }

}
