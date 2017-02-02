import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { AngularFire } from 'angularfire2';

@Injectable()
export class CourseService {
  constructor(
    private af: AngularFire,
  ) { }

  getCourses() {
    return this.af.database.list('/courses');
  }

  getCourse(id: number) {
    //return this.authHttp.get('/courses/' + id);
  }

  create(course: Course) {
    course.createdAt = new Date().toISOString();
    course.createdBy = this.af.auth.getAuth().uid;
    this.af.database.list('/courses').push(course);
  }
}
