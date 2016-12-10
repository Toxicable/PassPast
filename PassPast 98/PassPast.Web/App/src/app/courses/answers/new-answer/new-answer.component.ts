import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SignalrExamHubService } from '../../signalr-exam-hub.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-answer',
  templateUrl: 'new-answer.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewAnswerComponent implements OnInit {
  @Input() questionId: number;
  newAnswerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private examHub: SignalrExamHubService
  ) { }

  ngOnInit() {
    this.newAnswerForm = this.formBuilder.group({
      content: ''
    })
  }

  sendAnswer() {
    this.examHub.postAnswer(this.questionId, this.newAnswerForm.value['content']);
  }
}

