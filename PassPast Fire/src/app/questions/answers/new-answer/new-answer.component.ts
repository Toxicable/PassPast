import { AnswerService } from './../answer.service';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewAnswerComponent implements OnInit {
  @Input() questionKey: string;
  @Input() loggedIn: boolean;
  newAnswerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private answers: AnswerService,
  ) { }

  ngOnInit() {
    this.newAnswerForm = this.formBuilder.group({
      content: ''
    })
  }

  sendAnswer() {
    this.answers.create(this.newAnswerForm.value, this.questionKey);
    this.newAnswerForm.reset();
  }
}

