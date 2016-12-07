import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../../app-store';
import { ExamActionTypes, ExamActions } from './exam.actions';
import { Observable } from 'rxjs/Observable';
import { Exam } from '../models/exam';
import { ExamService } from './exam.service';
import { QuestionActions } from '../questions/question.actions';

@Injectable()
export class ExamEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private examService: ExamService,
    private examActions: ExamActions,
    private questionActions: QuestionActions
  ) { }

 @Effect()
  select: Observable<Action> = this.actions$
    .ofType(ExamActionTypes.SELECT)
    .map(action => +action.payload)
    .switchMap((examId: number) =>
      this.store.map(state => state.courses.exam.cache)
        .first()
        .flatMap((cachedExams: Exam[]) => {
          let localExams = cachedExams.find(c => c.id === examId);
          if (localExams) {
            return Observable.of(this.examActions.selectSuccess(localExams));
          }
          return this.examService.getExam(examId)
            .map((exam: Exam) => {
              if (exam != null) {
                return this.examActions.selectSuccess(exam);
              }
              return this.examActions.selectFailed();
            })
        })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(ExamActionTypes.SELECT_SUCCESS)
    .map(action => this.questionActions.load(action.payload.id));


  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(ExamActionTypes.LOAD)
    .map(action => +action.payload)
    .switchMap((paperId: number) =>
      this.store.map(state => state.courses.exam.cache)
        .first()
        .flatMap(exams => {
          let localExams = exams.filter(exam => exam.paperId === paperId);
          if (localExams.length > 0) {
            return Observable.of(this.examActions.loadSuccess(localExams));
          }
          return this.examService.getRelatedExams(paperId)
            .map(fetchedExams => {
              this.store.dispatch(this.examActions.cache(fetchedExams));
              return this.examActions.loadSuccess(fetchedExams);
            });
        })
    );



}
