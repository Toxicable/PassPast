import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, AccountService, ExternalAuthService } from '../../core';
import { FormValidators } from 'angular-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: string[];

  constructor(
    private account: AccountService,
    private alert: AlertService,
    private externalAuth: ExternalAuthService
  ) { }


  ngOnInit(): void {
    //TODO: make login/register same thing
    this.externalAuth.init();
  }

  facebookAuthorize() {
    this.externalAuth.login('Facebook')
      .subscribe(x => {
        this.alert.sendSuccess('Successfully registered');
      });
  }

  googleAuthorize() {
    this.externalAuth.login('Google')
      .subscribe(x => {
        this.alert.sendSuccess('Successfully registered');
      });
  }

}
