import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './core';
import { Store } from '@ngrx/store';
import { AppState } from './app-store';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { OpenIdClientService } from '@toxicable/oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private alert: AlertService,
    private router: Router,
    private title: Title,
    private oidc: OpenIdClientService
  ) { }

  ngOnInit(): void {
    this.oidc.init().subscribe(() => {}, error => console.warn(error));

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
  }


  ngOnDestroy(): void {
  }
}
