import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app/app-store';
import { QuestionService } from '../question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question';
import { SignalrExamHubService } from '../../signalr-exam-hub.service';
import { getDisplayed } from '../question.reducer';
import { normalize, Schema, arrayOf } from 'normalizr';

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

    const question = new Schema('questions');
    const answer = new Schema('answers');
    const comment = new Schema('comments');


    question.define({
      answers: arrayOf(answer),
      comments: arrayOf(comment),
      subQuestions: arrayOf(question)
    });

    this.store.select(state => state.courses.question.display)
      .subscribe(qs => {

        let denorm = normalize(qs, arrayOf(question))
        let renormed = normalize(denorm.entities, question)
        console.log(denorm);
     })



  }
}
