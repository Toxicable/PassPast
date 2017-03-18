import { CurrentDataService } from './core/current-data.service';
import { ExamService } from './exams/exam.service';
import { PaperService } from './papers/paper.service';
import { CourseService } from './courses/course.service';
import { CurrentUsersService } from './core/current-users.service';
import { AuthService } from './core/auth.service';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AlertService } from './core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private analitics: Angulartics2GoogleAnalytics,
    private currentData: CurrentDataService
  ) { }

  ngOnInit(): void {
    let t: Renderer2;

    this.auth.profile$.subscribe(profile => {
      if (profile) {
        this.analitics.setUsername(profile.displayName);
      }
    });

    this.currentData.setTitle().subscribe();

  }
}
