import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormValidators } from 'angular-validators';
import { AlertService, AccountService, ExternalAuthService } from '../../core';
import { Router } from '@angular/router';
import {  } from '../../../core/account/account.service';

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
