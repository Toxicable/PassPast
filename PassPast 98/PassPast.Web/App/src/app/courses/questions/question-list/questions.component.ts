import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app/app-store';
import { QuestionService } from '../question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question';
import { SignalrExamHubService } from '../../signalr-exam-hub.service';
import { getDisplayed } from '../question.reducer';

@Component({
  selector: 'app-questions',
  templateUrl: 'questions.component.html',
  styleUrls: ['./questions.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;

  constructor(
    private store: Store<AppState>,
    private questions: QuestionService,
    private examHub: SignalrExamHubService
  ) { }

  ngOnInit() {
    this.questions$ = this.store.select(state => state.courses.question.display)
      .map(questions => getDisplayed(questions))
  }
}
