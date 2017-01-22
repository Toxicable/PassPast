import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../app-store';
import { Paper } from '../models/paper';
import { ExamActions } from '../exams/exam.actions';
import { QuestionActionTypes, QuestionActions } from './question.actions';
import { ExamService } from '../exams/exam.service';
import { QuestionService } from './question.service';
import { normalize, Schema, arrayOf } from 'normalizr';
import { CommentActions } from '../comments/comment.actions';
import { AnswerActions } from '../answers/answer.actions';
import { LoadingBarService } from '../../core';
import { Dict } from '../models/dict';
import { Answer } from '../models/answer';

@Injectable()
export class QuestionEffects {
  questionSchema = new Schema('questions');

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private questionActions: QuestionActions,
    private questionService: QuestionService,
    private commentActions: CommentActions,
    private answerActions: AnswerActions,
    private loadingBar: LoadingBarService,
  ) {
    this.questionSchema.define({
      subQuestions: arrayOf(this.questionSchema)
    });
  }

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(QuestionActionTypes.LOAD)
    .map(action => +action.payload)
    .switchMap((examId: number) =>
      this.store.select(state => state.courses.question.entities)
        .first()
        .flatMap(questions => {
          return this.loadingBar.doWithLoader(
            this.questionService.getRelatedQuestions(examId)
              .map(fetchedQuestions => {
                const norm = normalize(fetchedQuestions, arrayOf(this.questionSchema))

                this.store.dispatch(this.questionActions.selectSuccess(norm.result));
                const normQuestions = norm.entities['questions'];
                //fetch comments
                const questionIds = Object.keys(norm.entities['questions']).map(id => +id);
                this.store.dispatch(this.answerActions.load(questionIds));
                this.store.dispatch(this.commentActions.load(questionIds));

                return this.questionActions.loadSuccess(normQuestions);
              })
          );
        })
    );
}
