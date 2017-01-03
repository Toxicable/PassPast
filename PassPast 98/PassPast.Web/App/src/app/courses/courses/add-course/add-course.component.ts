import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CourseService } from '../course.service';
import { AlertService } from '../../../../core/alert/alert.service';
import { AppState } from '../../../app-store';
import { Store } from '@ngrx/store';
import { CourseActions } from '../course.actions';
import { FormValidators } from 'angular-validators';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html'
})
export class AddCourseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private courses: CourseService,
    private alert: AlertService,
    private store: Store<AppState>,
    private courseActions: CourseActions,
  ) { }

  newCourseForm: FormGroup

  ngOnInit(): void {
    this.newCourseForm = this.formBuilder.group({
      name: ['', [FormValidators.required]],
      code: ['', [FormValidators.required]],
    });
  }

  onSubmit() {
    this.store.dispatch(this.courseActions.add(this.newCourseForm.value))

  }
}
