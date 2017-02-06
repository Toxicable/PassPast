import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { QuestionService } from '../question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question';
import { trackByIdentity } from '../../utilities';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;
  trackByFn = trackByIdentity;
  loggedIn$: Observable<boolean>;

  constructor(
    private questions: QuestionService,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {
    this.loggedIn$ = this.auth.loggedIn$;
   }

  ngOnInit() {
    this.questions.selectExam(this.route.snapshot.params['examKey']);
    this.questions$ = this.questions.questions$.map(questions => questions.filter(q => q.parentKey === ''));
  }
}
