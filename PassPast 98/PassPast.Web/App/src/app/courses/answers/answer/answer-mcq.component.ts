import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Answer } from '../../models/answer';
import { ExamHubService } from '../../exam-hub.service';
import { OpenIdClientService } from '@toxicable/oidc';

@Component({
  selector: 'app-answer-mcq',
  templateUrl: './answer-mcq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    md-progress-bar{
      height: 15px;
    }
    md-progress-bar:hover{
      opacity: 0.5;
    }
    `
  ]
})
export class AnswerMcqComponent {
  @Input() answer: Answer;
  @Input() totalAnswerVotes: number;
  @Input() loggedIn: boolean;

  constructor(
    private examHub: ExamHubService,
  ) { }

  sendVote() {
    if (this.loggedIn) {
      this.examHub.postAnswerVote(1, this.answer.id, 'mcq')
        .subscribe();
    }
  }

}
