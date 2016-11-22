import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import * as courseActions from './course.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { AuthHttp } from '../../../core/auth-http/auth-http.service';
import { CourseActions } from './course.actions';

@Injectable()
export class CourseService {
    constructor(private authHttp: AuthHttp,
                private store: Store<AppState>,
                private courseActions: CourseActions

    ) { }

    getCourses(): Observable<Course[]>{
        return this.authHttp.get('/courses')
            .do((courses: Course[]) => {
                this.store.dispatch(this.courseActions.Load(courses));
            })
    }

    getCourse(id: number): Observable<Course>{
        return this.authHttp.get('/courses/'+ id)
    }

    create(course: Course): Observable<Course>{
        return this.authHttp.post('/courses', course)
            .do((newCourse: Course) => {
                this.store.dispatch(this.courseActions.Add(newCourse));
            })
    }
}