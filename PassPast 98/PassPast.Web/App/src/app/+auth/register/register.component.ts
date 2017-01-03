import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormValidators } from 'angular-validators';
import { AlertService } from '../../../core/alert/alert.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/account/account.service';
import { ExternalAuthService } from '../../../core/auth-token/external-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.template.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private account: AccountService,
    private alert: AlertService,
    private router: Router,
    private externalAuth: ExternalAuthService
  ) { }

  ngOnInit() {
    this.externalAuth.init();
  }

  registerFacebook() {
    this.externalAuth.register('Facebook')
      .subscribe(x => {
        this.alert.sendSuccess('Successfully registered');
        this.router.navigateByUrl('/auth/login');
      });
  }

  registerGoogle() {
    this.externalAuth.register('Google')
      .subscribe(x => {
        this.alert.sendSuccess('Successfully registered');
        this.router.navigateByUrl('/auth/login');
      });
  }
}
