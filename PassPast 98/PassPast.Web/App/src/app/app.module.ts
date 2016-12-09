import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { appRouting } from './app.routing';
import { StoreModule, Store } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { CourseModule } from './courses/courses.module';
import { appReducer, AppState } from './app-store';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
     AppComponent,
     HomeComponent,
     NotFoundComponent,
     HeaderComponent,
     UnauthorizedComponent,
  ],
  imports: [
     BrowserModule,
    CoreModule,
    SharedModule,
    CourseModule,
    appRouting,
    StoreModule.provideStore(appReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
