import { ExamService } from './exams/exam.service';
import { PaperService } from './papers/paper.service';
import { CourseService } from './courses/course.service';
import { CurrentUsersService } from './core/current-users.service';
import { AuthService } from './core/auth.service';
import { Component, OnInit, OnDestroy, RendererV2 } from '@angular/core';
import { AlertService } from './core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private title: Title,
    private auth: AuthService,
    private analitics: Angulartics2GoogleAnalytics,
    private courses: CourseService,
    private papers: PaperService,
    private exams: ExamService,
  ) { }

  ngOnInit(): void {
    this.auth.profile$.subscribe(profile => {
      if (profile) {
        this.analitics.setUsername(profile.displayName);
      }
    });

    console.log(this.router.parseUrl(this.router.url))

    const defaultTitle = 'Pass Past';
    Observable.combineLatest(
      this.courses.selected$,
      this.papers.selected$,
      this.exams.selected$,
    ).subscribe((selectedItems) => {
      const course = selectedItems[0];
      const paper = selectedItems[1];
      const exam = selectedItems[2];

      const title = `${course.code || ''} ${paper.name || ''} ${exam.year || ''} ${exam.semester || ''}`;
      const oldTitle = this.title.getTitle();
      const equalTitles = title === oldTitle;

      if (title.trim() === '') {
        if (oldTitle !== defaultTitle) {
          this.title.setTitle(defaultTitle);
        }
      } else {
        if (title !== oldTitle) {
          this.title.setTitle(title);
        }
      }
    });
  }
}
