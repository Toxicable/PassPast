import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthTokenService } from '../core/auth-token/auth-token.service';
import { Store } from '@ngrx/store';
import { AlertService } from '../core/alert/alert.service';
import { AppState } from './app-store';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private tokens: AuthTokenService,
    private store: Store<AppState>,
    private alert: AlertService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit(): void {
    let defaultTitle = 'Pass Past';
    Observable.combineLatest(
      this.store.select(state => state.courses.course.selected),
      this.store.select(state => state.courses.paper.selected),
      this.store.select(state => state.courses.exam.selected)
    ).subscribe((selectedItems) => {
      let course = selectedItems[0];
      let paper = selectedItems[1];
      let exam = selectedItems[2];

      let title = `${course ? course.code : ''} ${paper ? paper.name : ''} ${exam ? exam.year : ''} ${exam ? exam.semester : ''}`;
      let oldTitle = this.title.getTitle();
      let equalTitles = title === oldTitle;

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



    this.tokens.startupTokenRefresh()
      .subscribe(
      () => {
        console.info('startup done');
        // we manage to refresh the tokens so we can carry with the scheduleRefresh
        this.tokens.scheduleRefresh();
      }, error => {
        console.error(error);
        // keep it silent if there's nothing in storage
        if (error !== 'No token in Storage') {
          this.alert.sendWarning('error');
        }
      });
  }


  ngOnDestroy(): void {
    this.tokens.unsubscribeRefresh();
  }
}
