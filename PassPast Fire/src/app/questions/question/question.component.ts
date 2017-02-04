import { CommentService } from './../comments/comment.service';
import { AnswerService } from './../answers/answer.service';
import { QuestionService } from './../question.service';
import { AngularFire } from 'angularfire2';
import { Component, OnInit, Input, ChangeDetectionStrategy, } from '@angular/core';
import { Question } from '../../models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Answer } from '../../models/answer';
import { Comment } from '../../models/comment';
import { trackByIdentity } from '../../utilities';
import { orderByAlpha, orderByDate } from '../../utilities/order-by-fns';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit {
  trackByFn = trackByIdentity;
  showComments = false;
  showContent = true;
  answerVoteSum: number;
  comments$: Observable<Comment[]>;
  answers$: Observable<Answer[]>;
  subQuestions$: Observable<Question[]>;

  constructor(
    private af: AngularFire,
    private questions: QuestionService,
    private answers: AnswerService,
    private comments: CommentService,
  ) { }

  @Input() loggedIn: boolean;
  @Input() question: Question;

  ngOnInit() {
    this.subQuestions$ = this.questions.questions$
    .map(questions => questions.filter(q => q.parentKey === this.question.$key))

    this.answers$ = this.answers.getAnswers(this.question.$key);
    //this.answers$.map(answers => answers.reduce((a, b) => a.))
    this.comments$ = this.comments.getComments(this.question.$key);
  }
}
