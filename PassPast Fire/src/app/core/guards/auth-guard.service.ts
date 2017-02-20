import { RolesService } from './../roles.service';
import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../alert';

@Injectable()
export class AuthGuard {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private auth: AuthService,
    private roles: RolesService,
  ) { }


  isLoggedIn() {
    return this.auth.loggedIn$
      .map(loggedIn => {
        if (!loggedIn) {
          this.alertService.sendError('You are not logged in');
          this.router.navigate(['auth/login']);
          return false;
        }
        return true;
      });
  }

  isInRole(role: string){

    return this.auth.loggedIn$
      .flatMap(loggedIn => {
        if (!loggedIn) {
          this.alertService.sendError('Unauthorized');
          this.router.navigate(['unauthorized']);
          return Observable.of(false);
        }

        return this.roles.isInRole(role)
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
