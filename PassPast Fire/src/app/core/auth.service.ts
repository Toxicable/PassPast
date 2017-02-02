import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor(
    private af: AngularFire,
  ) {
    this.loggedIn$ = this.af.auth.map(a => !!a);
    this.profile$ = this.af.auth;
  }

  loggedIn$: Observable<boolean>;
  profile$: Observable<any>;

  login(provider: AuthProviders) {
    this.af.auth.login({
      provider,
      method: AuthMethods.Popup
    });
  }
  logout() {
    this.af.auth.logout();
  }


}
