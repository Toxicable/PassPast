import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CourseService } from '../course.service';
import { AlertService } from '../../../core/alert/alert.service';

@Component({
    selector: 'add-course',
    templateUrl: 'add-course.component.html'
})
export class AddCourseComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private courses: CourseService,
                private alert: AlertService
    ) { }

    newCourseForm: FormGroup

    ngOnInit(): void {
        this.newCourseForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            code: ['', [Validators.required]],
        });
    }

    onSubmit(){
        this.courses.create(this.newCourseForm.value)
            .subscribe(() => this.alert.sendSuccess("SUccessfully crreate the Course :D"));
    }
}