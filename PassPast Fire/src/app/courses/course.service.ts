import { AuthService } from './../core/auth.service';
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
    private auth: AuthService,

  ) {
    this.courses$ = this.af.database.list('/courses')
  }
      sub: any;
  courses$: Observable<Course[]>;

  create(course: Course) {
    course.createdAt = new Date().toISOString();

    this.auth.uid$.first().subscribe(uid => {
      course.createdBy = uid;
      this.af.database.list('/courses').push(course);
    });
  }
}
