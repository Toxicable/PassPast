import { RequestService } from './request.service';
import { CurrentUsersService } from './current-users.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { RolesService } from './roles.service';
import { AuthService } from './auth.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertService } from './alert/alert.service';
import { LoadingBarService } from './loading-bar/loading-bar.service';
import { MaterialModule, MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../../environments/environment';
import { validationMessageMapper } from './validation-messages-mapper';

@NgModule({
  imports: [
    MaterialModule.forRoot(),
  ],
  providers: [
    LoadingBarService,
    AlertService,
    Title,
    AuthService,
    RolesService,
    AuthGuard,
    AdminAuthGuard,
    CurrentUsersService,
    RequestService,
    { provide: 'validationMessageMapper', useValue: validationMessageMapper },
  ]

})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
