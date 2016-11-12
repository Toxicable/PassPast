import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { AlertService } from '../../core/services/alert.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import * as courseStore from './course.reducer';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'courses',
    templateUrl: 'courses.component.html'
})
export class CoursesComponent implements OnInit {
        constructor(private courses: CourseService,
                    private alert: AlertService,
                    private store: Store<AppState>
    ) { }

    courses$: Observable<Course[]>;

    ngOnInit() {
        this.courses$ = this.store.map( state => state.courses.course.entities)

        this.courses.getCourses()
            .subscribe( () => this.alert.sendSuccess("We got the courses :D"))
     }
}