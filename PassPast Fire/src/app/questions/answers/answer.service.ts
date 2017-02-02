import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Answer } from '../models/answer';

@Injectable()
export class AnswerService {
  constructor(
  ) { }

  getAnswers(questionIds: number[]) {
    //return this.authHttp.get('/questions/' + questionIds.join(',') + '/answers')
  }
}
