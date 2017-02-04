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

  constructor(
    private questions: QuestionService,
  ) { }

  ngOnInit() {
    this.questions$ = this.questions.questions$;
    // this.questions$ = this.store.select(state => state.courses.question)
    //   .map(q => getQuestions(q.selected, q.entities ))
  }
}
