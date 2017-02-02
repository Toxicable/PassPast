import { Component, OnInit } from '@angular/core';
import { CourseService } from './../course.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course';
import { Store } from '@ngrx/store';
import { AlertService } from '../../core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AddCourseComponent } from './../add-course/add-course.component';
import { trackByIdentity } from '../../utilities/track-by-id';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  private newCourseDialogRef: MdDialogRef<AddCourseComponent>;
  courses$: Observable<Course[]>;
  trackByFn = trackByIdentity;
  loggedIn$: Observable<boolean>;

  constructor(
    private courses: CourseService,
    private alert: AlertService,
    private dialog: MdDialog,
    private af: AngularFire,
  ) { }

  ngOnInit() {
    this.courses$ = this.af.database.list('courses');
    //this.courses$ = this.store.select(state => state.courses.course.entities);

    //this.store.dispatch(this.courseActions.load());

    //this.loggedIn$ = this.oidc.loggedIn$;

  }

  openDialog() {
    this.newCourseDialogRef = this.dialog.open(AddCourseComponent, {
      disableClose: false
    });

    this.newCourseDialogRef.afterClosed()
      .subscribe(result => {
        this.newCourseDialogRef = null;
      });
  }
}
