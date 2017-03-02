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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import 'hammerjs';


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
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    CourseModule,
    PaperModule,
    ExamModule,
    QuestionModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    appRouting,
    AngularFireModule.initializeApp(environment.firebaseConfig, firebaseAuthConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
