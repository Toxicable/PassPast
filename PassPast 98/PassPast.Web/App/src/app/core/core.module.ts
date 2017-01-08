import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertService } from './alert/alert.service';
import { LoadingBarService } from './loading-bar/loading-bar.service';
import { AlertActions } from './alert/alert.actions';
import { LoadingBarActions } from './loading-bar/loading-bar.actions';
import { MaterialModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { OpenIdClientModule } from '@toxicable/oidc';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../../environments/environment';
import { AuthHttp } from './auth-http.service';

@NgModule({
  imports: [
    FlexLayoutModule.forRoot(),
    MaterialModule.forRoot(),
    OpenIdClientModule.withConfig({
      facebookAppId: environment.facebookAppId,
      googleClientId: environment.googleClientId,
      tokenEndpoint: 'api/connect/token',
      registerExternalEndpoint: '/api/account/registerexternal'
    })
  ],
  providers: [
    LoadingBarService,
    AlertService,
    Title,
    AlertActions,
    LoadingBarActions,
    AuthHttp,
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
