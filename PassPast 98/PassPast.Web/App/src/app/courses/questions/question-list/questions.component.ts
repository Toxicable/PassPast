import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app/app-store';
import { QuestionService } from '../question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question';
import { ExamHubService } from '../../exam-hub.service';
import { normalize, Schema, arrayOf } from 'normalizr';
import { getQuestions } from '../question.reducer';
import { Dict } from '../../models/dict';
import { NormQuestion } from '../../models/norm-question';
import { trackByIdentity } from '../../../../util/track-by-id';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<NormQuestion[]>;
  trackByFn = trackByIdentity;

  constructor(
    private store: Store<AppState>,
    private questions: QuestionService,
  ) { }

  ngOnInit() {
    this.questions$ = this.store.select(state => state.courses.question)
      .map(q => getQuestions(q.selected, q.entities ))
  }
}
