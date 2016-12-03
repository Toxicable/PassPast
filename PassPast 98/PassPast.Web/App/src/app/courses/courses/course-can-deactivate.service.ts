import { CanDeactivate } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AppState } from '../../app-store';
import { Store } from '@ngrx/store';
import { CourseActions } from './course.actions';

export class ConfirmDeactivateGuard implements CanDeactivate<CoursesComponent> {

    constructor(private store: Store<AppState>,
                private courseActions: CourseActions

    ) {}

  canDeactivate(target: CoursesComponent) {
    this.store.dispatch(this.courseActions.Select(null));
    return true;
  }
}