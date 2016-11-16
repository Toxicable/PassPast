import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
    selector: 'course',
    templateUrl: 'course.component.html'
})
export class CourseComponent implements OnInit {
    constructor(private courses: CourseService,
                private alert: AlertService
    
    ) { }

    ngOnInit() {
        this.courses.getCourses()
            .subscribe( () => this.alert.sendSuccess("We got the courses :D"))
     }
}