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
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { CourseModule } from './courses/courses.module';
import { appReducer } from './app-store';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './courses/courses/course.effects';
import { PaperEffects } from './courses/papers/paper.effects';

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
    EffectsModule.runAfterBootstrap(CourseEffects),
    EffectsModule.runAfterBootstrap(PaperEffects)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
