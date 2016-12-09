import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app/app-store';
import { QuestionService } from '../question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question';
import { ExamHubService } from '../../exam-hub.service';

@Component({
  selector: 'app-questions',
  templateUrl: 'questions.component.html',
  styleUrls: ['./questions.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;

  constructor(
    private store: Store<AppState>,
    private questions: QuestionService,
    private examHub: ExamHubService

  ) { }

  ngOnInit() {
    this.questions$ = this.store.select(state => state.courses.question.display);

 // this.examHub.init()
//  .subscribe()
   // this.commentsHub.init()
   //     .subscribe();

  }
}
