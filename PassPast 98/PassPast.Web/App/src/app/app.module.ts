import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
// import { CoreModule } from '../core/core.module';
// import { SharedModule } from '../shared/shared.module';
 import { HomeComponent } from './home/home.component';
 import { NotFoundComponent } from './not-found/not-found.component';
 import { NavigationComponent } from './navigation/navigation.component';
 import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
// import { appRouting } from './app.routing';
// import { appStore } from './app-store';
// import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
     AppComponent,
     HomeComponent,
     NotFoundComponent,
     NavigationComponent,
     UnauthorizedComponent,
  ],
  imports: [
     BrowserModule,
     CommonModule
    // CoreModule,
    // SharedModule,
    // appRouting,
    // appStore,

 //   StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
