import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { AuthHttp } from '../../core';
import { CourseActions } from './course.actions';
import { Http } from '@angular/http';

@Injectable()
export class CourseService {
  constructor(private authHttp: AuthHttp,
    private store: Store<AppState>,
    private courseActions: CourseActions

  ) { }

  getCourses(): Observable<Course[]> {
    return this.authHttp.get('/courses');
  }

  getCourse(id: number): Observable<Course> {
    return this.authHttp.get('/courses/' + id);
  }

  create(course: Course): Observable<Course> {
    return this.authHttp.post('/courses', course)
  }
}
