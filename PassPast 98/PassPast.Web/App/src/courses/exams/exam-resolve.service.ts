import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { Course } from '../models/course';
import * as examActions from './exam.actions'
import { Paper } from '../models/paper';
import { ExamService } from './exam.service';
import { Exam } from '../models/exam';

@Injectable()
export class ExamResolveService implements Resolve<void> {

  constructor(private exams: ExamService, 
              private router: Router,
              private store: Store<AppState>
              
              ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let examId = route.params['examId'];

    return this.store.map(state => state.courses.exam.entities)
      .first()
      .flatMap( (exams: Exam[]) => {
        let localExams = exams.find( c => c.id == examId)
        if(localExams){
          let action = new examActions.SelectAction(localExams);
          this.store.dispatch(action);
          return Observable.of(true);
        }
        return this.exams.getExam(examId)
          .map((exam: Exam) => {
            if(exam != null){
              let addAction = new examActions.AddAction(exam);
              this.store.dispatch(addAction);
              let action = new examActions.SelectAction(exam);
              this.store.dispatch(action);
              return true;
            }
            return false;
          })
      });
  }
}