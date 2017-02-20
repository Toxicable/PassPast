import { RequestService } from './../../core/request.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ExamService } from '../exam.service';

import { Exam } from '../../models/exam';
import { QuestionService } from '../../questions/question.service';
import { AlertService } from '../../core';
import { FormValidators } from 'angular-validators';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'add-exam',
  templateUrl: './add-exam.component.html'
})
export class AddExamComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private exams: ExamService,
    private alert: AlertService,
    private questions: QuestionService,
    private route: ActivatedRoute,
    private af: AngularFire,
    private request: RequestService,
  ) { }

  form: FormGroup;
  paperKey: string;
  isRequest: boolean;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      year: ['', [FormValidators.required, FormValidators.range(2000, 3000)]],
      semester: ['', FormValidators.required],
      sections: this.formBuilder.array([
        this.newSection()
      ])
    });
  }

  reset() {
    this.form.reset({year: '', semester: '', sections: []});
  }

  addSection() {
    const control = <FormArray>this.form.controls['sections']
    control.push(this.newSection());
  }

  addSubQuestion(i: number) {
    const control = <FormArray>this.form.controls['sections']
    const group = <FormGroup>control.controls[i];
    const subQuestions = <FormArray>group.controls['subQuestions']
    subQuestions.push(this.newSection());
  }

  newSection() {
    return this.formBuilder.group({
      incrimentType: ['', FormValidators.required],
      count: ['', FormValidators.required],
      type: ['', FormValidators.required],
      subQuestions: this.formBuilder.array([])
    });
  }

  removeSection(i: number) {
    const control = <FormArray>this.form.controls['sections']
    control.removeAt(i);
  }

  onSubmit() {
    if(!this.request){
      this.exams.create(this.form.value, this.paperKey);
    } else {
      this.request.create(Object.assign({}, this.form.value, {paperKey: this.paperKey }), 'exam');
    }
    this.reset();
  }
}
