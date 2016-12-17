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

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  _question: NormQuestion;
  totalAnswerVotes: number;
  showComments: boolean = false;
  subQuestions: Observable<NormQuestion[]>;
  answers: Observable<Answer[]>;
  comments: Observable<Comment[]>;

  @Input()
  set question(question: NormQuestion) {
    // sum the votes for this answers for this question
    // let totalAnswerVotes = question.answers
    //   .map(a => +a.totalVotes)
    //   .reduce((previousVote, currentVote) => previousVote + currentVote, 0);
    this._question = question
    this.subQuestions = this.store.select(state => state.courses.question.entities)
      .map(entities => getQuestions(question.subQuestions, entities ))

    this.answers = this.store.select(state => state.courses.answer.entities)
      //.do((a) => console.log(a))
      .map(entities => getAnswers(question.answers, entities))
      .do(answers => {
        this.totalAnswerVotes = answers
        .map(a => a.totalVotes)
        .reduce((previousVote, currentVote) => previousVote + currentVote, 0);
      })
      //.do((a) => console.log(a))
      //.do((a) => console.log(question.answers))

    this.comments = this.store.select(state => state.courses.comment.entities)
      .map(entities => getComments(question.comments, entities))

    // this._question = Object.assign({}, question, { totalAnswerVotes });

  }
  constructor(
    private examHub: ExamHubService,
    private store: Store<AppState>,
  ) { }

}
