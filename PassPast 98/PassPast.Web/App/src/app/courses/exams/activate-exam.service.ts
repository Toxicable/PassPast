import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CourseActions } from '../courses/course.actions';
import { ExamActions } from '../exams/exam.actions';
import { PaperActions } from '../papers/paper.actions';
import { AnswerActions } from '../answers/answer.actions';
import { QuestionActions } from '../questions/question.actions';
import { ExamHubService } from '../exam-hub.service';

@Injectable()
export class ActivateExamService implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private courseActions: CourseActions,
    private paperActions: PaperActions,
    private examActions: ExamActions,
    private questionActions: QuestionActions,
    private examHub: ExamHubService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let courseId = route.params['courseId'];
    let paperId = route.params['paperId'];

    this.store.dispatch(this.paperActions.select(+paperId));
    this.store.dispatch(this.courseActions.select(+courseId));
    this.store.dispatch(this.examActions.deselect());
    this.store.dispatch(this.questionActions.deselect());
    this.examHub.leaveCurrentRoom();
    return true;
  }


}
