import { Component, OnInit, Input } from '@angular/core';
import { ExamHubService } from '../exam-hub.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {
  @Input() type: string;
  @Input() id: number;
  @Input() votesSum: number;
  @Input() voteValue: number;
  constructor(
    private examHub: ExamHubService

  ) { }

  upVote() {
    if (this.type === 'answer') {
      this.examHub.postAnswerVote(1, this.id, 'short')
        .subscribe();
    }
    if (this.type === 'comment') {
      this.examHub.postCommentVote(1, this.id)
        .subscribe();
    }
  }

  downVote() {
    if (this.type === 'answer') {
      this.examHub.postAnswerVote(-1, this.id, 'short')
        .subscribe();
    }
    if (this.type === 'comment') {
      this.examHub.postCommentVote(-1, this.id)
        .subscribe();
    }
  }
}
