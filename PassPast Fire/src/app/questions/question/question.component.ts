import { Component, OnInit, Input, ChangeDetectionStrategy, } from '@angular/core';
import { Question } from '../../models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { NormQuestion } from '../../models/norm-question';
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
  totalAnswerVotes: number = 0;
  showComments: boolean = false;
  trackByFn = trackByIdentity;
  showContent = true;
  _question: NormQuestion;
  subQuestions: Observable<NormQuestion[]>;
  answers: Observable<Answer[]>;
  comments: Observable<Comment[]>;
  question$: BehaviorSubject<NormQuestion> = new BehaviorSubject<NormQuestion>(null);
  loggedIn$: Observable<boolean>;

  constructor(
  ) { }

  @Input()
  set question(question: NormQuestion) {
    this.question$.next(question);
    this._question = question;
  }

  ngOnInit() {
    //this.loggedIn$ = this.oidc.loggedIn$;

    // const question$ = this.question$.filter(q => !!q);
    // this.subQuestions = Observable.combineLatest(
    //   this.store.select(state => state.courses.question.entities),
    //   question$,
    //   (entities, question) => getQuestions(question.subQuestions, entities)
    // );

    // this.answers = Observable.combineLatest(
    //   this.store.select(state => state.courses.answer.entities),
    //   this.question$,
    //   (answers, question) => {
    //     return answers.filter(a => a.questionId === question.id)
    //   }
    // )
    //   .map(answers => orderByAlpha(answers, 'contentOrIncriment'))
    //   .do(answers => {
    //     this.totalAnswerVotes = answers
    //       .map(a => a.votesSum)
    //       .reduce((previousVote, currentVote) => previousVote + currentVote, 0);
    //   });

    // this.comments = Observable.combineLatest(
    //   this.store.select(state => state.courses.comment.entities),
    //   this.question$,
    //   (comments, question) => comments.filter(c => c.questionId === question.id)
    // ).map(comments => orderByDate(comments, 'createdAt'));

  }
}
