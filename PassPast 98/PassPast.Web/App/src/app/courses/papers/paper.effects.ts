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
          let localPaper = papers.find(c => c.id === paperId);
          if (localPaper) {
            return Observable.of(this.paperActions.selectSuccess(localPaper.id));
          }
          return this.paperService.getPaper(paperId)
            .map((paper: Paper) => {
              if (paper != null) {
                return this.paperActions.selectSuccess(paper.id);
              }
              return this.paperActions.selectFailed();
            })
        })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.SELECT_SUCCESS)
    .map(action => action.payload)
    .map(paperId => this.examActions.load(paperId));

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.LOAD)
    .map(action => action)
    .map(action => +action.payload)
    .switchMap(courseId =>
      this.store.select(state => state.courses.paper.entities)
        .first()
        .flatMap(papers => {
          let localPapers = papers.filter(paper => paper.courseId === courseId);
          if (localPapers.length > 0) {
            return Observable.never();
          }
          return this.paperService.getRelatedPapers(courseId)
            .map(fetchedPapers => this.paperActions.loadSuccess(fetchedPapers))
        })
    )

  @Effect()
  add: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.ADD)
    .map(a => { debugger; return a;})
    .map(action => action.payload)
    .flatMap((paper: Paper) =>
      this.store.select(state => state.courses.course.selectedId)
        .flatMap(courseId => {
          debugger
          paper.courseId = courseId;
          return this.paperService.create(paper)
            .map(paper => this.paperActions.addSuccess(paper))
        })
    )

}
