import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../app-store';
import { CourseActionTypes, CourseActions } from './course.actions';
import { Course } from '../models/course';
import { CourseService } from './course.service';
import { LoadingBarService } from '../../core';

@Injectable()
export class CourseEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private paperService: PaperService,
    private paperActions: PaperActions,
    private courseService: CourseService,
    private courseActions: CourseActions,
    private loadingBar: LoadingBarService
  ) { }

  @Effect()
  select: Observable<Action> = this.actions$
    .ofType(CourseActionTypes.SELECT)
    .map(action => +action.payload)
    .switchMap((courseId: number) =>
      this.store.select(state => state.courses.course.entities)
        .first()
        .flatMap((courses: Course[]) => {
          let localCourse = courses.find(c => c.id === courseId);
          if (localCourse) {
            return Observable.of(this.courseActions.selectSuccess(localCourse));
          }
          return this.courseService.getCourse(courseId)
            .map((course: Course) => {
              if (course != null) {
                return this.courseActions.selectSuccess(course);
              }
              return this.courseActions.selectFailed();
            });
        })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(CourseActionTypes.SELECT_SUCCESS)
    .map(action => action.payload)
    .map((course: Course) => this.paperActions.load(course.id))

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(CourseActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(() => {
      return this.store.select(state => state.courses.course.entities)
        .first()
        .flatMap(courses => {
          if (courses.length > 0) {
            return Observable.empty();
          }
          return this.loadingBar.doWithLoader(
            this.courseService.getCourses()
              .map(fetchedCourses => this.courseActions.loadSuccess(fetchedCourses))
          );
        });
    });

  @Effect()
  add: Observable<Action> = this.actions$
    .ofType(CourseActionTypes.ADD)
    .map(action => action.payload)
    .flatMap((course: Course) =>
      this.courseService.create(course)
        .map(fetchedCourse => this.courseActions.addSuccess(fetchedCourse))
    );

}
