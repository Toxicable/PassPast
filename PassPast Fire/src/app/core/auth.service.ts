import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor(
    private af: AngularFire,
  ) {
    this.loggedIn$ = this.af.auth.map(a => !!a);
    this.profile$ = this.af.auth.map(auth => {
      if (!auth) {
        return auth;
      } else if (auth.facebook) {
        return auth.facebook;
      } else if (auth.google) {
        return auth.google;
      }

    });
    this.uid$ = this.af.auth
      .map(auth => {
        if (auth) {
          return auth.uid;
        } else {
          console.warn('you are not logged in');
        }
      });
  }

  loggedIn$: Observable<boolean>;
  uid$: Observable<string>;
  profile$: Observable<firebase.UserInfo>;

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
