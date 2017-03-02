import { AuthService } from './../../core/auth.service';
import { RolesService } from './../../core/roles.service';
import { Component, OnInit, Inject, Optional} from '@angular/core';
import { CourseService } from './../course.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course';

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
  isAdmin$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(
    private courses: CourseService,
    private alert: AlertService,
    private dialog: MdDialog,
    private af: AngularFire,
    private roles: RolesService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.courses$ = this.courses.list$;
    this.loggedIn$ = this.auth.loggedIn$;
    this.isAdmin$ = this.roles.isInRole('Admin');
  }

  openDialog(isRequest = false) {
    this.newCourseDialogRef = this.dialog.open(AddCourseComponent, {
      disableClose: false
    });
    this.newCourseDialogRef.componentInstance.isRequest = isRequest;
    this.newCourseDialogRef.componentInstance.submitted.subscribe(s => this.newCourseDialogRef.close());
    this.newCourseDialogRef.afterClosed()
      .subscribe(result => {
        this.newCourseDialogRef = null;
      });
  }
}
