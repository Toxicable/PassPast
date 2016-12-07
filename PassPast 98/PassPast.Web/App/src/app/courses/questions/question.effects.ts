import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store';
import { Paper } from '../models/paper';
import { ExamActions } from '../exams/exam.actions';
import { QuestionActionTypes, QuestionActions } from './question.actions';
import { ExamService } from '../exams/exam.service';
import { QuestionService } from './question.service';

@Injectable()
export class QuestionEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private questionActions: QuestionActions,
    private questionService: QuestionService
  ) { }

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(QuestionActionTypes.LOAD)
    .map(action => +action.payload)
    .switchMap((examId: number) =>
      this.store.select(state => state.courses.question.cache)
        .first()
        .flatMap(questions => {
          let localQuestions = questions.filter(question => question.examId === examId);
          if (localQuestions.length > 0) {
            return Observable.of(this.questionActions.loadSuccess(localQuestions));
          }
          return this.questionService.getRelatedQuestions(examId)
            .map(fetchedQuestions => {
              this.store.dispatch(this.questionActions.cache(fetchedQuestions));
              return this.questionActions.loadSuccess(fetchedQuestions);
            });
        })
    );
}
