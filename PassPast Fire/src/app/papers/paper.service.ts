import { CourseService } from './../courses/course.service';
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
  selectedKey$: BehaviorSubject<string>;
  selected$: Observable<Paper>;

  constructor(
    private af: AngularFire,
    private loadingBar: LoadingBarService,
    private auth: AuthService,
    private courses: CourseService,
  ) {
    this.list$ = this.af.database.list('/papers', {
      query: {
        orderByChild: 'courseKey',
        equalTo: this.courses.selectedKey$,
      }
    });
    this.selectedKey$ = new BehaviorSubject<string>(null);
    this.selected$ = this.selectedKey$
      .flatMap(key => this.af.database.object(`/papers/${key}`));
  }

  select(paperId: string) {
    this.selectedKey$.next(paperId);
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
