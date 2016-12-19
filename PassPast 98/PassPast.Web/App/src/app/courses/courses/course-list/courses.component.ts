import { Component, OnInit } from '@angular/core';
import { CourseService } from './../course.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course';
import { AppState } from '../../../../app/app-store';
import { Store } from '@ngrx/store';
import { AlertService } from '../../../../core/alert/alert.service';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AddCourseComponent } from './../add-course/add-course.component';
import { CourseActions } from './../course.actions';
import { trackByIdentity } from '../../../../util/track-by-id';

@Component({
    selector: 'app-courses',
    templateUrl: 'courses.component.html'
})
export class CoursesComponent implements OnInit {
    private newCourseDialogRef: MdDialogRef<AddCourseComponent>;
    courses$: Observable<Course[]>;
    trackByFn = trackByIdentity;

    constructor(private courses: CourseService,
                private alert: AlertService,
                private store: Store<AppState>,
                private dialog: MdDialog,
                private courseActions: CourseActions
    ) { }


    openDialog() {
        this.newCourseDialogRef = this.dialog.open(AddCourseComponent, {
            disableClose: false
        });

        this.newCourseDialogRef.afterClosed()
            .subscribe(result => {
            console.log('result: ' + result);
            this.newCourseDialogRef = null;
        });
    }
    ngOnInit() {
        this.courses$ = this.store.select( state => state.courses.course.entities);

        this.store.dispatch(this.courseActions.load());
     }
}
