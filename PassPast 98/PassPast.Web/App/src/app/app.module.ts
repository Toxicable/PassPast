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
import { StoreModule, combineReducers } from '@ngrx/store';
import { alertReducer } from '../core/alert/alert.reducer';
import { loadingBarReducer } from '../core/loading-bar/loading-bar.reducer';
import { authReducer } from '../core/auth-store/auth.store';
import { usersReducer } from './+admin/users/user-reducer';
import { HeaderComponent } from './header/header.component';
import { CourseModule } from './courses/courses.module';
import { coursesReducer } from './courses/courses.store';
import { courseReducer } from './courses/courses/course.reducer';
import { paperReducer } from './courses/papers/paper.reducer';
import { examReducer } from './courses/exams/exam.reducer';
import { questionReducer } from './courses/questions/question.reducer';
import { appReducer } from './app-store';

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
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
