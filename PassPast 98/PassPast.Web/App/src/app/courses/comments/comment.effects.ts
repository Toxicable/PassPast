import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CommentService } from './comment.service';
import { Observable } from 'rxjs/Observable';
import { CommentActionTypes, CommentActions } from './comment.actions';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class CommentEffects {

  constructor(
    private actions$: Actions,
    private commentService: CommentService,
    private commentActions: CommentActions
  ) { }

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(CommentActionTypes.LOAD)
    .map(action => action.payload)
    .flatMap((questionIds: number[]) =>
      this.commentService.getComments(questionIds)
        .map(comments => this.commentActions.loadSuccess(comments))
    );

}
