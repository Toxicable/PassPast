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
import { normalizePapers, denormalizePapers } from './paper.reducer';

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
        .flatMap(papers => {
          let localPaper = papers[paperId];
          if (localPaper) {
            return Observable.of(this.paperActions.selectSuccess(localPaper));
          }
          return this.paperService.getPaper(paperId)
            .map((paper: Paper) => {
              if (paper != null) {
                this.store.dispatch(this.paperActions.add(paper));
                return this.paperActions.selectSuccess(paper);
              }
              return this.paperActions.selectFailed();
            })
        })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.SELECT_SUCCESS)
    .map(action => this.examActions.load(action.payload));


  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.LOAD)
    .map(action => +action.payload)
    .switchMap((courseId: number) =>
      this.store.select(state => state.courses.paper.entities)
        .first()
        .flatMap(papers => {
          const denormalized = denormalizePapers(papers);
          let localPapers = denormalized.filter(paper => paper.courseId === courseId);
          if (localPapers.length > 0) {
            return Observable.of(this.paperActions.loadSuccess(null));
          }
          return this.paperService.getRelatedPapers(courseId)
            .map(fetchedPapers => normalizePapers(fetchedPapers))
            .map(fetchedPapers => this.paperActions.loadSuccess(fetchedPapers));
        })
    );

  @Effect()
  add: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.ADD)
    .map(action => action.payload)
    .flatMap(paper =>
      this.store.select(state => state.courses.course.selectedId)
        .first()
        .flatMap(courseId => {
          paper.courseId = courseId;
          return this.paperService.create(paper)
            .map(paper => normalizePapers([paper]))
            .map(paper => this.paperActions.addSuccess(paper))
        })
    );
}
