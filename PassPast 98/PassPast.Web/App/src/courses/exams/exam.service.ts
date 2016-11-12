import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';
import { Observable } from 'rxjs/Observable';
import { AuthApiService } from '../../core/services/auth-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';
import * as examActions from './exam.actions'

@Injectable()
export class ExamService {
  constructor(private authApi: AuthApiService,
    private store: Store<AppState>) { }

    getCourses(): Observable<Exam[]>{
        return this.authApi.get('/exams/getAll')
            .do((exams: Exam[]) => { 
                let action = new examActions.LoadAction(exams);
                this.store.dispatch(action);
            })
    }

    getCourse(id: number): Observable<Exam>{
        return this.authApi.get('/exams/get/'+ id)
    }

    create(exam: Exam): Observable<Exam>{
        return this.authApi.post('/exams/create', exam)
            .do((newCourse: Exam) => {
                let action = new examActions.AddAction(newCourse);
                this.store.dispatch(action);
            })
    }
}