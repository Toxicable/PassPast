import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { CourseService } from './course.service'
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { Course } from '../models/course';
import * as courseActions from './course.actions'
import { AddAction } from './course.actions';

@Injectable()
export class CourseResolveService implements Resolve<void> {

  constructor(private courses: CourseService, 
              private router: Router,
              private store: Store<AppState>
              
              ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let courseId = route.params['courseId'];

    return this.store.map(state => state.courses.course.entities)
      .first()
      .flatMap( (courses: Course[]) => {
        let localCourse = courses.find( c => c.id == courseId)
        if(localCourse){
          let action = new courseActions.SelectAction(localCourse);
          this.store.dispatch(action);
          return Observable.of(true);
        }
        return this.courses.getCourse(courseId)
          .map((course: Course) => {
            if(course != null){
              let addAction = new courseActions.AddAction(course);
              this.store.dispatch(addAction);
              let action = new courseActions.SelectAction(course);
              this.store.dispatch(action);
              return true;
            }
            return false;
          })
      });
  }
}