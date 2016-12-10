import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Answer } from '../../models/answer';
import { SignalrExamHubService } from '../../signalr-exam-hub.service';

@Component({
  selector: 'app-answer-mcq',
  templateUrl: 'answer-mcq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerMcqComponent {
  @Input() answer: Answer;
  @Input() totalAnswerVotes: number;

  constructor(
    private examHub: SignalrExamHubService
  ) {}

}
