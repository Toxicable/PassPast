import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CourseActions } from '../courses/course.actions';
import { ExamActions } from '../exams/exam.actions';
import { PaperActions } from '../papers/paper.actions';

@Injectable()
export class ActivateQuestionsService implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private courseActions: CourseActions,
    private paperActions: PaperActions,
    private examActions: ExamActions
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let courseId = route.params['courseId'];
    let paperId = route.params['paperId'];
    let examId = route.params['examId'];
    this.store.dispatch(this.examActions.select(+examId));
    this.store.dispatch(this.paperActions.select(+paperId));
    this.store.dispatch(this.courseActions.select(+courseId));
    return true;
  }


}
