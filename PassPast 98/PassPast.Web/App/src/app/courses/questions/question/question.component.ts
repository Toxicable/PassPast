import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../../models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamHubService } from '../../exam-hub.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-store';
import { getQuestions } from '../question.reducer';
import { NormQuestion } from '../../models/norm-question';
import { getAnswers } from '../../answers/answer.reducer';
import { Answer } from '../../models/answer';
import { getComments } from '../../comments/comment.reducer';
import { Comment } from '../../models/comment';
import { trackByIdentity } from '../../../../util/track-by-id';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  _question: NormQuestion;
  totalAnswerVotes: number = 0;
  showComments: boolean = false;
  subQuestions: Observable<NormQuestion[]>;
  answers: Observable<Answer[]>;
  comments: Observable<Comment[]>;
  trackByFn = trackByIdentity;
  showContent = true;

  @Input()
  set question(question: NormQuestion) {

    this._question = question;
    this.subQuestions = this.store.select(state => state.courses.question.entities)
      .map(entities => getQuestions(question.subQuestions, entities ))

    this.answers = this.store.select(state => state.courses.answer.entities)
      .map(entities => getAnswers(question.answers, entities))
      .do(answers => {
        this.totalAnswerVotes = answers
          .map(a => a.totalVotes)
          .reduce((previousVote, currentVote) => previousVote + currentVote, 0);
      });

    this.comments = this.store.select(state => state.courses.comment.entities)
      .map(entities => getComments(question.comments, entities));

  }
  constructor(
    private examHub: ExamHubService,
    private store: Store<AppState>,
  ) { }

}
