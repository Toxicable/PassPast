import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, LoadingBarService } from '../../core';
import { FormValidators } from 'angular-validators';
import { OpenIdClientService } from '@toxicable/oidc';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { DefaultUrlSerializer, Router } from '@angular/router'

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
    private router: Router
  ) {
    // let seralizer = new DefaultUrlSerializer();
    // let urlTree = router.parseUrl("http://localhost:4200/signin-facebook?#access_token=EAAEbUTzFQGwBABfWPEstZArMdKgcZBtoO0uXiZCzZBLU2xMwnEJbBVqnwZA0HBLT2DNZAJi7263MZBZCiEqFXtjJw41ZClEww7WxZAhfJIyPa5nw3kUjYXp2RdchpZBXpp01LfMa6QOnaco0kNNKHdT97ncuNg8gJ1ZA5XUVoZAtqm2HZCGtgs5jia0EzrJDRKJflS9R4ZD&expires_in=4570");
    // let accessToken = urlTree.queryParams['access_token'];

    // console.log(urlTree);

    // console.log(router.parseUrl(urlTree.fragment));
  }

  ngOnInit() {

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
