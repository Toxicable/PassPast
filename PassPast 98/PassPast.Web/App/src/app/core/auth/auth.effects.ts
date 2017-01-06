import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthTokenService } from './auth-token.service'
@Injectable()
export class AuthEffects {
    constructor(
    private actions$: Actions,
    private authTokens: AuthTokenService,
  ) { }

  // @Effect({dispatch: false}) tokenRefresh$ = this.actions$
  // .ofType(AuthActions.types.STARTUP_REFRESH)
  // .do(() => {
  //   this.authTokens.startupTokenRefresh()
  //     //.do(() => this.authTokens.scheduleRefresh())
  //     .subscribe(() => true , error => console.info(error));
  // });


}
