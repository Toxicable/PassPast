import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CourseService } from '../course.service';
import { AlertService } from '../../core';

import { FormValidators } from 'angular-validators';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html'
})
export class AddCourseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private courses: CourseService,
    private alert: AlertService,
  ) { }

  newCourseForm: FormGroup

  ngOnInit(): void {
    this.newCourseForm = this.formBuilder.group({
      name: ['', [FormValidators.required]],
      code: ['', [FormValidators.required]],
    });
  }

  onSubmit() {
    this.courses.create(this.newCourseForm.value);
  }
}
