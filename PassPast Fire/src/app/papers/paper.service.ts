import { LoadingBarService } from './../core/loading-bar/loading-bar.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app/app-store';
import { Paper } from '../models/paper';

@Injectable()
export class PaperService {
  papers$: Observable<Paper[]>;
  selectedCourseId: BehaviorSubject<string>;

  constructor(
    private af: AngularFire,
    private loadingBar: LoadingBarService,
  ) {
    this.selectedCourseId = new BehaviorSubject<string>(null);
    this.papers$ = this.af.database.list('/papers', {
      query: {
        orderByChild: 'courseKey',
        equalTo: this.selectedCourseId,
      }
    })
    this.papers$.subscribe(p => p === null ? this.loadingBar.load() : this.loadingBar.done() );
  }

  selectCourse(courseId: string) {
    this.selectedCourseId.next(courseId);
  }

  create(paper: Paper, courseKey: string) {
    paper.courseKey = courseKey;
    paper.createdAt = new Date().toISOString();
    paper.createdBy = this.af.auth.getAuth().uid;
    this.af.database.list('/papers').push(paper);
    // return this.authHttp.post('/papers', paper);
  }
}
