import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { appRouting } from './app.routing';
import { StoreModule, Store } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '@angular/material';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { PapersComponent } from './papers/paper-list/papers.component';
import { ExamsComponent } from './exams/exam-list/exams.component';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { QuestionsComponent } from './questions/question-list/questions.component';
import { QuestionComponent } from './questions/question/question.component';


import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { QuestionSectionComponent } from './exams/add-exam/question-section.component';

import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { CommentComponent } from './comments/comment/comment.component';

import { AnswersModule} from './answers/answers.module'
import { CourseModule } from './courses/courses.module';

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
    PapersComponent,
    ExamsComponent,
    AddExamComponent,
    QuestionsComponent,
    AddPaperComponent,
    QuestionSectionComponent,
    QuestionComponent,

  NewCommentComponent,
    CommentComponent,
  ],
  entryComponents: [
    AddPaperComponent
  ],
  imports: [
    AnswersModule,
CourseModule,

    BrowserModule,
    CoreModule,
    SharedModule,
    appRouting,
    //StoreModule.provideStore(appReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
