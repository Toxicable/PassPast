import { PaperForm, Paper } from './../models';
import { AuthService } from './../core/auth.service';
import { LoadingBarService } from './../core/loading-bar/loading-bar.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
  }

  selectCourse(courseId: string) {
    this.selectedCourseId.next(courseId);
  }

  create(paper: PaperForm, courseKey: string) {
    const newPaper = <Paper>paper;
    newPaper.courseKey = courseKey;
    newPaper.createdAt = new Date().toISOString();
    this.auth.uid$.first().subscribe(uid => {
      newPaper.createdBy = uid;
      this.af.database.list('/papers').push(paper);
    });
  }

  checkExists(paper: PaperForm): Observable<boolean> {
    return this.list$
      .first()
      .map(papers => papers.find(p => p.name === paper.name))
      .map(p => !!p);
  }
}
