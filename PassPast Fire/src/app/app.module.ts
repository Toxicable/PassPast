import { environment } from './../environments/environment';
import { QuestionModule } from './questions/questions.module';
 import { ExamModule } from './exams/exams.module';
 import { PaperModule } from './papers/papers.module';
 import { CourseModule } from './courses/courses.module';
 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { appRouting } from './app.routing';
import { HeaderComponent } from './header/header.component';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import 'hammerjs';

export const firebaseConfig = {
  apiKey: 'AIzaSyCamLQzMFEpDnftJHEOLQQafayGLXMPpSo',
  authDomain: 'pass-past.firebaseapp.com',
  databaseURL: 'https://pass-past.firebaseio.com',
  storageBucket: 'pass-past.appspot.com',
  messagingSenderId: '137170270322'
};

export const firebaseConfigDev = {
  apiKey: 'AIzaSyA2hJW-dMxigmsP4-D4qGJeGPGhPW5CdkQ',
  authDomain: 'pass-past-dev.firebaseapp.com',
  databaseURL: 'https://pass-past-dev.firebaseio.com',
  storageBucket: 'pass-past-dev.appspot.com',
  messagingSenderId: '406000911823'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
     NotFoundComponent,
     HeaderComponent,
     UnauthorizedComponent,
  ],
  imports: [
     CourseModule,
     PaperModule,
     ExamModule,
     QuestionModule,

     BrowserModule,
     CoreModule,
     SharedModule,
     appRouting,
     AngularFireModule.initializeApp(environment.production ? firebaseConfig : firebaseConfigDev, firebaseAuthConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
