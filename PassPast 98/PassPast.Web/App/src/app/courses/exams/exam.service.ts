import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { AuthHttp } from '../../../core/auth-http/auth-http.service';
import { ExamActions } from './exam.actions';

@Injectable()
export class ExamService {
  constructor(private authHttp: AuthHttp,
    private store: Store<AppState>,
    private examActions: ExamActions

  ) { }

  getExams(): Observable<Exam[]> {
    return this.authHttp.get('/exams');
  }

  getExam(id: number): Observable<Exam> {
    return this.authHttp.get('/exams/' + id);
  }

  getRelatedExams(paperId: number): Observable<Exam[]> {
    return this.authHttp.get(`/papers/${paperId}/exams`);
  }

  create(exam: Exam): Observable<Exam> {
    return this.authHttp.post('/exams', exam)
      .do((newExam: Exam) => {
        this.store.dispatch(this.examActions.add(newExam));
      });
  }
}
