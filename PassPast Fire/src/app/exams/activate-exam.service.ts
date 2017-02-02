import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ActivateExamService implements CanActivate {

  constructor(

  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // let courseId = route.params['courseId'];
    // let paperId = route.params['paperId'];

    // this.store.dispatch(this.paperActions.select(+paperId));
    // this.store.dispatch(this.courseActions.select(+courseId));
    // this.store.dispatch(this.examActions.deselect());
    // this.store.dispatch(this.questionActions.deselect());
    // this.examHub.leaveCurrentRoom();
    // return true;
  }


}
