import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../app-store';
import { PaperActionTypes } from './paper.actions';
import { Paper } from '../models/paper';
import { ExamActions } from '../exams/exam.actions';
import { Course } from '../models/course';
import { Exam } from '../models/exam';

import { LoadingBarService } from '../../core';
@Injectable()
export class PaperEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private paperService: PaperService,
    private paperActions: PaperActions,
    private examActions: ExamActions,
    private loadingBar: LoadingBarService
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
            return Observable.of(this.paperActions.selectSuccess(localPaper));
          }
          return this.paperService.getPaper(paperId)
            .map((paper: Paper) => {
              if (paper != null) {
                return this.paperActions.selectSuccess(paper);
              }
              return this.paperActions.selectFailed();
            })
        })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.SELECT_SUCCESS)
    .map(action => action.payload)
    .map((exam: Exam) => this.examActions.load(exam.id));

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.LOAD)
    .map(action => action)
    .map(action => action.payload)
    .switchMap((courseId: number) =>
      this.store.select(state => state.courses.paper.entities)
        .first()
        .flatMap(papers => {
          const localPapers = papers.filter(paper => paper.courseId === courseId);
          if (localPapers.length > 0) {
            return Observable.empty();
          }
          return this.loadingBar.doWithLoader(
            this.paperService.getRelatedPapers(courseId)
              .map(fetchedPapers => this.paperActions.loadSuccess(fetchedPapers))
          );
        })
    )

  @Effect()
  add: Observable<Action> = this.actions$
    .ofType(PaperActionTypes.ADD)
    .map(action => action.payload)
    .flatMap((paper: Paper) =>
      this.store.select(state => state.courses.course.selected)
        .flatMap(course => {
          paper.courseId = course.id;
          return this.paperService.create(paper)
            .map(fetchedPaper => this.paperActions.addSuccess(fetchedPaper))
        })
    )

}
