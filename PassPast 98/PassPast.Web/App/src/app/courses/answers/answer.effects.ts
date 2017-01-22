import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AnswerService } from './answer.service';
import { Observable } from 'rxjs/Observable';
import { AnswerActionTypes, AnswerActions } from './answer.actions';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class AnswerEffects {

  constructor(
    private actions$: Actions,
    private answerService: AnswerService,
    private answerActions: AnswerActions
  ) { }

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(AnswerActionTypes.LOAD)
    .map(action => action.payload)
    .flatMap((questionIds: number[]) =>
      this.answerService.getAnswers(questionIds)
        .map(comments => this.answerActions.loadSuccess(comments))
    );

}
