import { AuthService } from './../core/auth.service';
import { LoadingBarService } from './../core/loading-bar/loading-bar.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course, CourseForm } from '../models';

import { Http } from '@angular/http';
import { AngularFire } from 'angularfire2';

@Injectable()
export class CourseService {
  constructor(
    private af: AngularFire,
    private loadingBar: LoadingBarService,
    private auth: AuthService,

  ) {
    this.list$ = this.af.database.list('/courses')
  }
  list$: Observable<Course[]>;

  create(course: CourseForm) {
    const newCourse = <Course>course;
    newCourse.createdAt = new Date().toISOString();

    this.auth.uid$.first().subscribe(uid => {
      newCourse.createdBy = uid;
      this.af.database.list('/courses').push(course);
    });
  }

  checkExists(course: CourseForm): Observable<boolean> {
    return this.af.database.list('/courses', {
      query: {
        orderByChild: 'name',
        equalTo: course.name,
        limitToFirst: 1
      }
    }).first().flatMap((nameFetchedCourses: Course[]) => {
      if (nameFetchedCourses.length > 0) {
        return Observable.of(true);
      } else {
        return this.af.database.list('/courses', {
          query: {
            orderByChild: 'code',
            equalTo: course.code,
            limitToFirst: 1
          }
        }).first().map((codeFetchedCourses: Course[]) => {
          return codeFetchedCourses.length > 0;
        });
      }
    });
  }
}
