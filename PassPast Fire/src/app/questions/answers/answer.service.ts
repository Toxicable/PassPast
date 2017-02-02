import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Answer, Course } from '../../models';

@Injectable()
export class AnswerService {
  constructor(
  ) { }

  getAnswers(questionIds: number[]) {
    //return this.authHttp.get('/questions/' + questionIds.join(',') + '/answers')
  }
}
