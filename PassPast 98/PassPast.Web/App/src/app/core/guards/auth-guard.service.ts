import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../app-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertService } from '../alert';
import { OpenIdClientService } from '@toxicable/oidc';

@Injectable()
export class AuthGuard {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private store: Store<AppState>,
    private oidc: OpenIdClientService
  ) { }


  isLoggedIn(): Observable<boolean> {
    return this.oidc.loggedIn$
      .do(loggedIn => {
        if (!loggedIn) {
          this.alertService.sendError('You are not logged in');
          this.router.navigate(['auth/login']);
        }
      });
  }

  isInRole(role: string): Observable<boolean> {

    return this.oidc.loggedIn$
      .flatMap(loggedIn => {
        if (loggedIn) {
          this.alertService.sendError('Unauthorized');
          this.router.navigate(['unauthorized']);
          return Observable.of(false);
        }

        return this.oidc.isInRole(role)
          .map(isInRole => {
            if (!isInRole) {
              this.alertService.sendError('Unauthorized');
              this.router.navigate(['unauthorized']);
              return false;
            }
            return true;
          });

      })
      .first();
  }
}
