import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormValidators } from 'angular-validators';
import { AlertService } from '../../core';
import { Router } from '@angular/router';
import {  } from '../../../core/account/account.service';
import { OpenIdClientService } from '@toxicable/oidc';

@Component({
  selector: 'app-register',
  templateUrl: './register.template.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private alert: AlertService,
    private router: Router,
    private oidc: OpenIdClientService
  ) { }

  ngOnInit() {
    this.oidc.initExternal();
  }

  registerFacebook() {
    this.oidc.registerExternal('facebook')
      .subscribe(x => {
        this.alert.sendSuccess('Successfully registered');
      });
  }

  registerGoogle() {
    this.oidc.registerExternal('google')
      .subscribe(x => {
        this.alert.sendSuccess('Successfully registered');
      });
  }
}
