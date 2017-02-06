import { RolesService } from './../core/roles.service';
import { AuthProviders } from 'angularfire2';
import { AuthService } from './../core';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../app-store';

import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Paper } from '../models/paper';
import { Exam } from '../models/exam';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  profile$: Observable<firebase.UserInfo>;
  isAdmin$: Observable<boolean>;
  currentCourse$: Observable<Course>;
  currentPaper$: Observable<Paper>;
  currentExam$: Observable<Exam>;

  constructor(
    private auth: AuthService,
    private roles: RolesService,
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.roles.isInRole('Admin');
    this.loggedIn$ = this.auth.loggedIn$;
    this.profile$ = this.auth.profile$;

    // this.currentExam$ = this.store.select(state => state.courses.exam.selected);
    // this.currentPaper$ = this.store.select(state => state.courses.paper.selected);
    // this.currentCourse$ = this.store.select(state => state.courses.course.selected);

  }

  logout() {
    this.auth.logout();
  }
  loginGoogle() {
    this.auth.login(AuthProviders.Google);
  }
  loginFacebook() {
    this.auth.login(AuthProviders.Facebook);
  }
}
