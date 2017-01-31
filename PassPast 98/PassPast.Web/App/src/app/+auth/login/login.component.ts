import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, LoadingBarService } from '../../core';
import { FormValidators } from 'angular-validators';
import { OpenIdClientService } from '@toxicable/oidc';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ExamHubService } from '../../courses/exam-hub.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.template.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: string[];

  constructor(
    private alert: AlertService,
    private oidc: OpenIdClientService,
    private loadingBar: LoadingBarService,
    private examHub: ExamHubService,
  ) { }


  facebookAuthorize() {
    this.login('facebook');

  }

  googleAuthorize() {
    this.login('google')
  }
  login(provider: string) {
    this.loadingBar.doWithLoader(this.oidc.loginExternal(provider))
      .do(() => {
        this.examHub.stop();
        this.examHub.start();
      })
      .subscribe(x => this.alert.sendSuccess('Successfully logged in'));

  }

}
