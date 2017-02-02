import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';

@Injectable()
export class CourseService {
  constructor(

  ) { }

  getCourses() {
    //return this.authHttp.get('/courses');
  }

  getCourse(id: number) {
    //return this.authHttp.get('/courses/' + id);
  }

  create(course: Course) {
   // return this.authHttp.post('/courses', course)
  }
}
