import { AnaliticsErrorHandler } from './analitics-error-handler.service';
import { RequestService } from './request.service';
import { CurrentUsersService } from './current-users.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { RolesService } from './roles.service';
import { AuthService } from './auth.service';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertService } from './alert/alert.service';
import { LoadingBarService } from './loading-bar/loading-bar.service';
import { MaterialModule, MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../../environments/environment';
import { validationMessageMapper } from './validation-messages-mapper';
import { VALIDATION_MESSAGE_MAPPER } from 'angular-validators';

@NgModule({
  imports: [
    MaterialModule,
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
    { provide: VALIDATION_MESSAGE_MAPPER, useValue: validationMessageMapper },
    { provide: ErrorHandler, useClass: environment.production ? AnaliticsErrorHandler : ErrorHandler }
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
