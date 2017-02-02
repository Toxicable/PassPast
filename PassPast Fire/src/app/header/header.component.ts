import { Component, OnInit } from '@angular/core';
import { AppState } from '../app-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Paper } from '../models/paper';
import { Exam } from '../models/exam';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  currentCourse$: Observable<Course>;
  currentPaper$: Observable<Paper>;
  currentExam$: Observable<Exam>;

  constructor(
  ) { }

  ngOnInit(): void {
    // this.profile$ = this.oidc.profile$;

    // this.loggedIn$ = this.oidc.loggedIn$;

    // this.currentExam$ = this.store.select(state => state.courses.exam.selected);

    // this.currentPaper$ = this.store.select(state => state.courses.paper.selected);

    // this.currentCourse$ = this.store.select(state => state.courses.course.selected);

  }

  logout() {
    //this.oidc.logout();
  }
}
