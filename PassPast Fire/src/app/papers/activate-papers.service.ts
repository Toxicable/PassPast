import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class ActivatePaperService {

  constructor(

  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // let courseId = route.params['courseId'];
    // this.store.dispatch(this.courseActions.select(+courseId));
    // this.store.dispatch(this.paperActions.deselect());
    // this.store.dispatch(this.examActions.deselect());
    // return true;
  }


}
