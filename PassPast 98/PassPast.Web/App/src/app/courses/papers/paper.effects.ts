import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store';
import { PaperActionTypes } from './paper.actions';
import { Paper } from '../models/paper';
import { ExamActions } from '../exams/exam.actions';

@Injectable()
export class PaperEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private paperService: PaperService,
    private paperActions: PaperActions,
    private examActions: ExamActions
  ) { }
  @Effect()
  select: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.SELECT)
    .map(action => +action.payload)
    .switchMap((paperId: number) =>
      this.store.select(state => state.courses.paper.entities)
        .first()
        .flatMap((papers: Paper[]) => {
          let localPapers = papers.find(c => c.id === paperId);
          if (localPapers) {
            return Observable.of(this.paperActions.selectSuccess(localPapers));
          }
          return this.paperService.getPaper(paperId)
            .map((paper: Paper) => {
              if (paper != null) {
                this.store.dispatch(this.paperActions.Add(paper));
                return this.paperActions.selectSuccess(paper);
              }
              return this.paperActions.selectFailed();
            })
        })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.SELECT_SUCCESS)
    .map(action => this.examActions.load(action.payload.id));


  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.LOAD)
    .map(action => +action.payload)
    .switchMap((courseId: number) =>
      this.store.select(state => state.courses.paper.entities)
        .first()
        .flatMap(papers => {
          let localPapers = papers.filter(paper => paper.courseId === courseId);
          if (localPapers.length > 0) {
            return Observable.of(this.paperActions.loadSuccess(localPapers));
          }
          return this.paperService.getRelatedPapers(courseId)
            .map(fetchedPapers => {
              this.store.dispatch(this.paperActions.cache(fetchedPapers));
              return this.paperActions.loadSuccess(fetchedPapers);
            });
        })
    );


}
