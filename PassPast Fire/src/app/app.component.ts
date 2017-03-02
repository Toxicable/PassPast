import { CurrentUsersService } from './core/current-users.service';
import { AuthService } from './core/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
    // private alert: AlertService,
    // private router: Router,
    // private title: Title,
    private auth: AuthService,
    // private currenUsers: CurrentUsersService,
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) { }

  ngOnInit(): void {
    this.auth.profile$.subscribe(profile => {
      if (profile) {
        this.angulartics2GoogleAnalytics.setUsername(profile.displayName);
      }
    });

    try {
      throw new Error('testiong error');
    } catch (err) {
      this.angulartics2GoogleAnalytics.exceptionTrack(err);
    }
    // this.currenUsers.onConnected();
    // const defaultTitle = 'Pass Past';
    // Observable.combineLatest(
    //   this.store.select(state => state.courses.course.selected),
    //   this.store.select(state => state.courses.paper.selected),
    //   this.store.select(state => state.courses.exam.selected)
    // ).subscribe((selectedItems) => {
    //   const course = selectedItems[0];
    //   const paper = selectedItems[1];
    //   const exam = selectedItems[2];

    //   const title = `${course ? course.code : ''} ${paper ? paper.name : ''} ${exam ? exam.year : ''} ${exam ? exam.semester : ''}`;
    //   const oldTitle = this.title.getTitle();
    //   const equalTitles = title === oldTitle;

    //   if (title.trim() === '') {
    //     if (oldTitle !== defaultTitle) {
    //       this.title.setTitle(defaultTitle);
    //     }
    //   } else {
    //     if (title !== oldTitle) {
    //       this.title.setTitle(title);
    //     }
    //   }
  }
}
