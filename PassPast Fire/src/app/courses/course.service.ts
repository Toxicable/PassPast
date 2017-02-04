import { LoadingBarService } from './../core/loading-bar/loading-bar.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';

import { Http } from '@angular/http';
import { AngularFire } from 'angularfire2';

@Injectable()
export class CourseService {
  constructor(
    private af: AngularFire,
    private loadingBar: LoadingBarService,
  ) {
    this.courses = new BehaviorSubject<Course[]>(null);
    this.courses$ = this.courses.asObservable();
    this.af.database.list('/courses').subscribe(c => this.courses.next(c));
    this.courses$.subscribe(c => !c ? this.loadingBar.load() : this.loadingBar.done())
  }
  private courses: BehaviorSubject<Course[]>
  courses$: Observable<Course[]>;

  getCourse(id: number) {
    //return this.authHttp.get('/courses/' + id);
  }

  create(course: Course) {
    course.createdAt = new Date().toISOString();
    course.createdBy = this.af.auth.getAuth().uid;
    this.af.database.list('/courses').push(course);
  }
}
