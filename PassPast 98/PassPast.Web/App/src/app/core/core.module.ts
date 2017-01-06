import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageBackend, Storage, StorageBackend } from './storage';
import { AlertService } from './alert/alert.service';
import { LoadingBarService } from './loading-bar/loading-bar.service';
import { AlertActions } from './alert/alert.actions';
import { LoadingBarActions } from './loading-bar/loading-bar.actions';
import { MaterialModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthHttp,
  ExternalAuthService,
  AccountService,
  ProfileService,
  AuthTokenService,
  AuthEffects,
} from './auth';


import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [
    EffectsModule.run(AuthEffects),
    FlexLayoutModule.forRoot(),
    MaterialModule.forRoot(),
  ],
  providers: [
    LoadingBarService,
    AlertService,
    ProfileService,
    Title,
    AuthTokenService,
    AccountService,
    ExternalAuthService,
    AuthHttp,

    AlertActions,
    LoadingBarActions,

    { provide: StorageBackend, useClass: LocalStorageBackend },
    Storage,
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
