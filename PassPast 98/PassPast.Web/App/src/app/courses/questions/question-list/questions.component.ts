import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app/app-store';
import { QuestionService } from '../question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question';
import { SignalrExamHubService } from '../../signalr-exam-hub.service';
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
    this.questions$ = this.store.select(state => state.courses.question.entities)
      .map(questions => questions.filter(a => a.parentQuestionId == null))


    // const question = new Schema('questions');
    // const answer = new Schema('answers');
    // const comment = new Schema('comments');


    // question.define({
    //   answers: arrayOf(answer),
    //   comments: arrayOf(comment),
    //   subQuestions: arrayOf(question)
    // });

    // this.store.select(state => state.courses.question.entities)
    //   .subscribe(qs => {
    //     let norm = normalize(qs, arrayOf(question))
    //     console.log(norm)
//        let renormed = normalize(norm.entities, question)
        // let questions = norm.entities['questions'];
        // if (questions == undefined) { return }

        // let comments = norm.entities['comments'];
        // let answers = norm.entities['answers'];

        // let denormQuestions = Object.keys(questions).map(key => {
        //   let denormQuestion = questions[key]
        //   for (let i = 0; i < denormQuestion.subQuestions.length; i++) {
        //     denormQuestion.subQuestions[i] = questions[denormQuestion.subQuestions[i]]
        //   }
        //   for (let i = 0; i < denormQuestion.comments.length; i++) {
        //     denormQuestion.comments[i] = comments[denormQuestion.comments[i]]
        //   }
        //   for (let i = 0; i < denormQuestion.answers.length; i++) {
        //     denormQuestion.answers[i] = answers[denormQuestion.answers[i]]
        //   }
        //   return denormQuestion;
        // })
        // console.log(denormQuestions)



      })

  }
}
