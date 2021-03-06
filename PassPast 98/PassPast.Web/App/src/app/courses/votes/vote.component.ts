import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ExamHubService } from '../exam-hub.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent {
  @Input() type: string;
  @Input() id: number;
  @Input() votesSum: number;
  @Input() voteValue: number;
  @Input() loggedIn: boolean;
  constructor(
    private examHub: ExamHubService

  ) { }

  upVote() {
    if (this.loggedIn) {
      if (this.type === 'answer') {
        this.examHub.postAnswerVote(1, this.id, 'short')
      }
      if (this.type === 'comment') {
        this.examHub.postCommentVote(1, this.id)
      }
    }
  }

  downVote() {
    if (this.loggedIn) {
      if (this.type === 'answer') {
        this.examHub.postAnswerVote(-1, this.id, 'short')
      }
      if (this.type === 'comment') {
        this.examHub.postCommentVote(-1, this.id)
      }
    }
  }
}
