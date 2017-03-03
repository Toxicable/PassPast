import { ExamService } from './../exams/exam.service';
import { PaperService } from './../papers/paper.service';
import { CourseService } from './../courses/course.service';
import { RolesService } from './../core/roles.service';
import { AuthProviders } from 'angularfire2';
import { AuthService } from './../core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Paper } from '../models/paper';
import { Exam } from '../models/exam';

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
    private courses: CourseService,
    private papers: PaperService,
    private exams: ExamService,
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.roles.isInRole('Admin');
    this.loggedIn$ = this.auth.loggedIn$;
    this.profile$ = this.auth.profile$;

    this.currentCourse$ = this.courses.selected$;
    this.currentPaper$ = this.papers.selected$;
    this.currentExam$ = this.exams.selected$;
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
