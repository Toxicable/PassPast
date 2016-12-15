import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ExamService } from '../exam.service';
import { AppState } from '../../../../app/app-store';
import { Store } from '@ngrx/store';
import { Exam } from '../../models/exam';
import { QuestionService } from '../../questions/question.service';
import { AlertService } from '../../../../core/alert/alert.service';
import { FormValidationService } from '../../../../core/services/form-validation.service';
import { ExamActions } from '../exam.actions';

@Component({
  selector: 'add-exam',
  templateUrl: 'add-exam.component.html'
})
export class AddExamComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private exams: ExamService,
    private alert: AlertService,
    private store: Store<AppState>,
    private questions: QuestionService,
    private formValidation: FormValidationService,
    private examActions: ExamActions,
  ) { }

  newExamForm: FormGroup

  ngOnInit(): void {
    this.newExamForm = this.formBuilder.group({
      year: ['', [Validators.required, this.formValidation.yearRangeValidator]],
      semester: ['', Validators.required],
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
      incrimentationScheme: ['', Validators.required],
      count: ['', Validators.required],
      type: ['', Validators.required],
      subQuestions: this.formBuilder.array([])
    });
  }

  removeSection(i: number) {
    const control = <FormArray>this.newExamForm.controls['sections']
    control.removeAt(i);
  }

  onSubmit() {
    this.store.dispatch(this.examActions.add(this.newExamForm.value));
    // this.store.select(state => state.courses.paper.selected.id)
    //     .first()
    //     .flatMap((paperId: number) => {
    //         let newExam = Object.assign({}, {paperId}, this.newExamForm.value)
    //         delete newExam['sections'];

    //         return this.exams.create(newExam)
    //             .flatMap((exam: Exam) => {
    //                 let data = Object.assign({}, {examId: exam.id}, this.newExamForm.value);
    //                 delete data['semester'];
    //                 delete data['year'];
    //                 return this.questions.create(data)
    //             })

    //     })
    //     .subscribe(() => this.alert.sendSuccess('wow we actually did it :D'))
  }
}
