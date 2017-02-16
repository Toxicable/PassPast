import { AuthService } from './../core/auth.service';
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
  list$: Observable<Paper[]>;
  selectedCourseId: BehaviorSubject<string>;

  constructor(
    private af: AngularFire,
    private loadingBar: LoadingBarService,
    private auth: AuthService,
  ) {
    this.selectedCourseId = new BehaviorSubject<string>(null);
    this.list$ = this.af.database.list('/papers', {
      query: {
        orderByChild: 'courseKey',
        equalTo: this.selectedCourseId,
      }
    });
    this.list$.subscribe(p => p === null ? this.loadingBar.load() : this.loadingBar.done());
  }

  selectCourse(courseId: string) {
    this.selectedCourseId.next(courseId);
  }

  create(paper: Paper, courseKey: string) {
    paper.courseKey = courseKey;
    paper.createdAt = new Date().toISOString();
    this.auth.uid$.first().subscribe(uid => {
      paper.createdBy = uid;
      this.af.database.list('/papers').push(paper);
    });
  }

  checkExists(paper: Paper): Observable<boolean> {
    return this.list$
      .first()
      .map(papers => papers.find(p => p.name === paper.name))
      .map(p => !!p);
  }
}
