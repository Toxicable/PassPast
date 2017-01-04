import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { AppState } from '../../../app-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../models';
import { AlertService } from '../../alert';


@Injectable()
export class AuthGuard {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private profile: ProfileService,
    private store: Store<AppState>
  ) { }


  isLoggedIn(): Observable<boolean> {
    return this.store.select(state => state.auth)
      .first((auth: AuthState) => auth.authReady)
      .map((auth: AuthState) => auth.loggedIn)
      .do((loggedIn: boolean) => {
        if (!loggedIn) {
          this.alertService.sendError('You are not logged in');
          this.router.navigate(['auth/login']);
        }
      });
  }

  isInRole(role: string): Observable<boolean> {

    return this.store.select(state => state.auth)
      .first((auth: AuthState) => auth.authReady)
      .flatMap((auth: AuthState) => {
        if (!auth.loggedIn) {
          this.alertService.sendError('Unauthorized');
          this.router.navigate(['unauthorized']);
          return Observable.of(false);
        }

        return this.profile.isInRole(role)
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
