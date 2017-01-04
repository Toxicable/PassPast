import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ExamService } from '../exam.service';
import { AppState } from '../../../../app/app-store';
import { Store } from '@ngrx/store';
import { Exam } from '../../models/exam';
import { QuestionService } from '../../questions/question.service';
import { AlertService } from '../../../core';
import { FormValidators } from 'angular-validators';
import { ExamActions } from '../exam.actions';

@Component({
  selector: 'add-exam',
  templateUrl: './add-exam.component.html'
})
export class AddExamComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private exams: ExamService,
    private alert: AlertService,
    private store: Store<AppState>,
    private questions: QuestionService,
    private examActions: ExamActions,
  ) { }

  newExamForm: FormGroup

  ngOnInit(): void {
    this.newExamForm = this.formBuilder.group({
      year: ['', [FormValidators.required, FormValidators.range(2000, 3000)]],
      semester: ['', FormValidators.required],
      sections: this.formBuilder.array([
        this.newSection()
      ])
    });
  }

  addSection() {
    const control = <FormArray>this.newExamForm.controls['sections']
    control.push(this.newSection());
  }

  addSubQuestion(i: number) {
    const control = <FormArray>this.newExamForm.controls['sections']
    const group = <FormGroup>control.controls[i];
    const subQuestions = <FormArray>group.controls['subQuestions']
    subQuestions.push(this.newSection());
  }

  newSection() {
    return this.formBuilder.group({
      incrimentationScheme: ['', FormValidators.required],
      count: ['', FormValidators.required],
      type: ['', FormValidators.required],
      subQuestions: this.formBuilder.array([])
    });
  }

  removeSection(i: number) {
    const control = <FormArray>this.newExamForm.controls['sections']
    control.removeAt(i);
  }

  onSubmit() {
    this.store.dispatch(this.examActions.add(this.newExamForm.value));
  }
}
