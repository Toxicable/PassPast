import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Injectable()
export class ExamService {
  constructor(

  ) { }

  getExams() {
   // return this.authHttp.get('/exams');
  }

  getExam(id: number) {
   // return this.authHttp.get('/exams/' + id);
  }

  getRelatedExams(paperId: number){
   // return this.authHttp.get(`/papers/${paperId}/exams`);
  }

  create(exam: Exam) {
   // return this.authHttp.post('/exams', exam)
  }
}
