import { RequestService } from './../../core/request.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
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
    private requests: RequestService,
  ) { }

  newCourseForm: FormGroup;
  isRequest: boolean;

  ngOnInit(): void {
    this.newCourseForm = this.formBuilder.group({
      name: ['', [FormValidators.required]],
      code: ['', [FormValidators.required]],
    }, {
        asyncValidator: FormValidators.composeAsync(this.isRequest ?
          [this.requestExistsValidator.bind(this), this.courseExistsValidator.bind(this)] :
          [this.courseExistsValidator.bind(this)])
      });
  }

  courseExistsValidator(group: FormGroup) {
    return this.courses.checkExists(group.value)
      .map(exists => exists ? { courseExists: true } : null);
  }

  requestExistsValidator(group: FormGroup) {
    return this.requests.checkExisting(group.value).first()
      .map(exists => exists ? { requestExists: true } : null);
  }

  onSubmit() {
    if (!this.isRequest) {
      this.courses.create(this.newCourseForm.value);
    } else {
      this.requests.create(this.newCourseForm.value, 'course');
    }
    this.newCourseForm.reset();
  }
}
