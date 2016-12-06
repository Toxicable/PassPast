import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { PaperActions } from '../papers/paper.actions';
import { CourseActions } from './course.actions';
import { ExamActions } from '../exams/exam.actions';

@Injectable()
export class ActivateCourseService implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private courseActions: CourseActions,
    private paperActions: PaperActions,
    private examActions: ExamActions
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.store.dispatch(this.courseActions.deselect());
    this.store.dispatch(this.paperActions.deselect());
    this.store.dispatch(this.examActions.deselect());
    return true;
  }


}
