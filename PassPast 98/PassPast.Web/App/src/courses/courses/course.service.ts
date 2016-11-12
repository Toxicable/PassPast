import { Injectable } from '@angular/core';
import { AuthApiService } from '../../core/services/auth-api.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import * as courseActions from './course.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';

@Injectable()
export class CourseService {
    constructor(private authApi: AuthApiService,
    private store: Store<AppState>) { }

    getCourses(): Observable<Course[]>{
        return this.authApi.get('/courses/getAll')
            .do((courses: Course[]) => { 
                let action = new courseActions.LoadAction(courses);
                this.store.dispatch(action);
            })
    }

    getCourse(id: number): Observable<Course>{
        return this.authApi.get('/courses/get/'+ id)
    }

    create(course: Course): Observable<Course>{
        return this.authApi.post('/courses/create', course)
            .do((newCourse: Course) => {
                let action = new courseActions.AddAction(newCourse);
                this.store.dispatch(action);
            })
    }
}