import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CourseActions } from '../courses/course.actions';
import { ExamActions } from '../exams/exam.actions';
import { PaperActions } from './paper.actions';

@Injectable()
export class ActivatePaperService implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private courseActions: CourseActions,
    private paperActions: PaperActions,
    private examActions: ExamActions
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let courseId = route.params['courseId'];
    this.store.dispatch(this.courseActions.select(+courseId));
    this.store.dispatch(this.paperActions.deselect());
    this.store.dispatch(this.examActions.deselect());
    return true;
  }


}
