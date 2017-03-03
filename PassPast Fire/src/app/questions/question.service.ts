import { ExamService } from './../exams/exam.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Question } from '../models/question';

@Injectable()
export class QuestionService {

  questions$: Observable<Question[]>;

  constructor(
    private af: AngularFire,
    private exams: ExamService,
  ) {
    this.questions$ = this.af.database.list('/questions', {
      query: {
        orderByChild: 'examKey',
        equalTo: this.exams.selectedKey$
      }
    });
   }



}
