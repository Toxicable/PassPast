import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ActivateQuestionsService {

  constructor(

  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // let courseId = route.params['courseId'];
    // let paperId = route.params['paperId'];
    // let examId = route.params['examId'];
    // this.store.dispatch(this.examActions.select(+examId));
    // this.store.dispatch(this.paperActions.select(+paperId));
    // this.store.dispatch(this.courseActions.select(+courseId));
    // this.examHub.joinRoom(examId);
    // return true;
  }


}
