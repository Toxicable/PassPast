import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, LoadingBarService } from '../../core';
import { FormValidators } from 'angular-validators';
import { OpenIdClientService } from '@toxicable/oidc';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';


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
    private loadingBar: LoadingBarService,
  ) { }

  ngOnInit(){

  }

  facebookAuthorize() {
    this.loadingBar.doWithLoader(this.oidc.loginExternal('facebook'))
      .subscribe(x => this.alert.sendSuccess('Successfully logged in'));

  }

  googleAuthorize() {
    this.loadingBar.doWithLoader(this.oidc.loginExternal('google'))
      .subscribe(x => this.alert.sendSuccess('Successfully logged in'));
  }

}
