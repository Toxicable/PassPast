import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store';
import { Course } from '../models/course';
import { PaperActionTypes } from './paper.actions';

@Injectable()
export class PaperEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private paperService: PaperService,
    private paperActions: PaperActions,
  ) { }

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap( (courseId: number) =>
      this.store.map(state => state.courses.paper.cache)
      .first()
      .flatMap(papers => {
        let localPapers = papers.filter(paper => paper.courseId === courseId);
        if (localPapers.length > 0) {
          return Observable.of(this.paperActions.loadSuccess(localPapers));
        }
        return this.paperService.getPapers(courseId)
          .map(fetchedPapers => {
            this.store.dispatch(this.paperActions.cache(fetchedPapers));
            return this.paperActions.loadSuccess(fetchedPapers);
          });
      })
    );


}
