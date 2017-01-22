import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { AuthHttp } from '../../core';
import { Http } from '@angular/http';
import { Answer } from '../models/answer';

@Injectable()
export class AnswerService {
  constructor(
    private authHttp: AuthHttp,
  ) { }

  getAnswers(questionIds: number[]): Observable<Answer[]> {
    return this.authHttp.get('/questions/' + questionIds.join(',') + '/answers')
  }
}
