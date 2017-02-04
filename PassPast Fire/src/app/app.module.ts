import { QuestionModule } from './questions/questions.module';
import { QuestionsComponent } from './questions/question-list/questions.component';
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
import { MaterialModule } from '@angular/material';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import 'hammerjs';

export const firebaseConfig = {
  apiKey: 'AIzaSyCamLQzMFEpDnftJHEOLQQafayGLXMPpSo',
  authDomain: 'pass-past.firebaseapp.com',
  databaseURL: 'https://pass-past.firebaseio.com',
  storageBucket: 'pass-past.appspot.com',
  messagingSenderId: '137170270322'
};

const myFirebaseAuthConfig = {
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
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
