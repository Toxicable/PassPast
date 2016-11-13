import { Injectable } from '@angular/core';
import { AuthApiService } from '../../core/services/auth-api.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';
import { Question } from '../models/question';

@Injectable()
export class QuestionService {
    constructor(private authApi: AuthApiService,
    private store: Store<AppState>) { }

    getCourses(): Observable<Question[]>{
        return this.authApi.get('/questions/getAll')
            .do((courses: Question[]) => { 
                //let action = new courseActions.LoadAction(courses);
                //this.store.dispatch(action);
            })
    }

//todo: make this a proper model
    create(course: any): Observable<Question>{
        return this.authApi.post('/questions/create', course)
            .do((newCourse: Question) => {
                //let action = new courseActions.AddAction(newCourse);
                //this.store.dispatch(action);
            })
    }
}