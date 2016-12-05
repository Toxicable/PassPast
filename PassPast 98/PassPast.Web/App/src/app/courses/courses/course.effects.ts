import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store';
import { CourseActionTypes, CourseActions } from './course.actions';
import { Course } from '../models/course';
import { CourseService } from './course.service';

@Injectable()
export class CourseEffects {


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private paperService: PaperService,
    private paperActions: PaperActions,
    private courseService: CourseService,
    private courseActions: CourseActions
  ) { }

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(CourseActionTypes.LOAD)
    .switchMap(action =>
      this.courseService.getCourses()
        .map(courses => this.courseActions.loadSuccess(courses))
    );

  @Effect()
  select: Observable<Action> = this.actions$
    .ofType(CourseActionTypes.SELECT)
    .map(action => +action.payload)
    .switchMap((courseId: number) =>
      this.store.map(state => state.courses.course.entities)
      .first()
      .flatMap((courses: Course[]) => {
        let localCourse = courses.find(c => c.id === courseId);
        if (localCourse) {
          return Observable.of(this.courseActions.selectSuccess(localCourse));
        }
        return this.courseService.getCourse(courseId)
          .map((course: Course) => {
            if (course != null) {
              this.store.dispatch(this.courseActions.add(course));
              return this.courseActions.selectSuccess(course);
            }
            return this.courseActions.selectFailed();
          });
      })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(CourseActionTypes.SELECT_SUCCESS)
    .map(action => this.paperActions.load(action.payload.id));


}
