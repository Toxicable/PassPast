import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CourseService } from '../course.service';
import { AlertService } from '../../core';
import { Store } from '@ngrx/store';
import { FormValidators } from 'angular-validators';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html'
})
export class AddCourseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private courses: CourseService,
    private alert: AlertService,
    private af: AngularFire,
  ) { }

  newCourseForm: FormGroup

  ngOnInit(): void {
    this.newCourseForm = this.formBuilder.group({
      name: ['', [FormValidators.required]],
      code: ['', [FormValidators.required]],
    });
  }

  onSubmit() {
    this.af.database.list('/courses').push(this.newCourseForm.value)
    //this.store.dispatch(this.courseActions.add(this.newCourseForm.value))

  }
}
