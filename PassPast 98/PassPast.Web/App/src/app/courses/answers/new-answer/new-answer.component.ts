import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ExamHubService } from '../../exam-hub.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewAnswerComponent implements OnInit {
  @Input() questionId: number;
  newAnswerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private examHub: ExamHubService
  ) { }

  ngOnInit() {
    this.newAnswerForm = this.formBuilder.group({
      content: ''
    })
  }

  sendAnswer() {
    this.examHub.postAnswer(this.questionId, this.newAnswerForm.value['content']);
    this.newAnswerForm.reset();
  }
}

