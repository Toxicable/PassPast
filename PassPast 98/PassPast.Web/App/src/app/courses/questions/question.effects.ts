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
import { normalize, Schema, arrayOf } from 'normalizr';

@Injectable()
export class QuestionEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private questionActions: QuestionActions,
    private questionService: QuestionService
  ) {
    this.questionSchema.define({
      answers: arrayOf(this.answerSchema),
      comments: arrayOf(this.commentSchema),
      subQuestions: arrayOf(this.questionSchema)
    });
  }

  questionSchema = new Schema('questions');
  answerSchema = new Schema('answers');
  commentSchema = new Schema('comments');

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(QuestionActionTypes.LOAD)
    .map(action => +action.payload)
    .switchMap((examId: number) =>
      this.store.select(state => state.courses.question.entities)
        .first()
        .flatMap(questions => {
          let localQuestions = questions.filter(question => question.examId === examId);
          if (localQuestions.length > 0) {
            return Observable.of(this.questionActions.loadSuccess(localQuestions));
          }
          return this.questionService.getRelatedQuestions(examId)
            .map(questions => {
              let norm = normalize(questions, arrayOf(this.questionSchema)).entities

              return this.questionActions.loadSuccess(norm['questions']);
            })
        })
    );
}