import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Question } from '../models/question';

@Injectable()
export class QuestionService {

  questions$: Observable<Question[]>;
  private selectedExamKey: BehaviorSubject<string>;

  constructor(
    private af: AngularFire,
  ) {
    this.selectedExamKey = new BehaviorSubject<string>(null);
    this.questions$ = this.af.database.list('/questions', {
      query: {
        orderByChild: 'examKey',
        equalTo: this.selectedExamKey
      }
    });
   }

   selectExam(examKey: string){
     this.selectedExamKey.next(examKey);
   }

}
