import { Vote } from './../../models/vote';
import { VoteService } from './../votes/vote.service';
import { CommentService } from './../comments/comment.service';
import { AnswerService } from './../answers/answer.service';
import { QuestionService } from './../question.service';
import { AngularFire } from 'angularfire2';
import { Component, OnInit, Input, ChangeDetectionStrategy, } from '@angular/core';
import { Question } from '../../models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Comment, Answer } from '../../models';
import { trackByIdentity } from '../../utilities';
import { orderByAlpha, orderByDate } from '../../utilities/order-by-fns';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit {
  trackByFn = trackByIdentity;
  showComments = false;
  showContent = true;
  answerVoteSum: Observable<number>;
  comments$: Observable<Comment[]>;
  answers$: Observable<Answer[]>;
  subQuestions$: Observable<Question[]>;

  constructor(
    private af: AngularFire,
    private questions: QuestionService,
    private answers: AnswerService,
    private comments: CommentService,
    private votes: VoteService,
  ) { }

  @Input() loggedIn: boolean;
  @Input() question: Question;

  ngOnInit() {
    this.subQuestions$ = this.questions.questions$
      .map(questions => questions.filter(q => q.parentKey === this.question.$key));

    this.answers$ = this.answers.getAnswers(this.question.$key);

    if (this.question.type === 'mcq') {
      this.answerVoteSum = this.answers$.map(answers =>
        answers.reduce((a, b) => a + b.voteSum, 0)
      );

    }
    this.comments$ = this.comments.getComments(this.question.$key);
  }
}
