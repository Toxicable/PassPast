import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { CourseService } from './course.service'
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { Course } from '../models/course';
import { CourseActions } from './course.actions';

@Injectable()
export class CourseResolveService implements Resolve<void> {

  constructor(private courses: CourseService, 
              private router: Router,
              private store: Store<AppState>,
              private courseActions: CourseActions
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let courseId = route.params['courseId'];

    return this.store.map(state => state.courses.course.entities)
      .first()
      .flatMap( (courses: Course[]) => {
        let localCourse = courses.find( c => c.id == courseId)
        if(localCourse){
          this.store.dispatch(this.courseActions.Select(localCourse));
          return Observable.of(true);
        }
        return this.courses.getCourse(courseId)
          .map((course: Course) => {
            if(course != null){
              this.store.dispatch(this.courseActions.Add(course));
              this.store.dispatch(this.courseActions.Select(course));
              return true;
            }
            return false;
          })
      });
  }
}