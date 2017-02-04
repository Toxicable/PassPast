import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ActivateCourseService{

  constructor(

  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // this.store.dispatch(this.courseActions.deselect());
    // this.store.dispatch(this.paperActions.deselect());
    // this.store.dispatch(this.examActions.deselect());
    // return true;
  }


}
