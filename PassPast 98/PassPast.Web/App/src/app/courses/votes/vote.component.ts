import { Component, OnInit, Input } from '@angular/core';
import { ExamHubService } from '../exam-hub.service';

@Component({
  selector: 'app-vote',
  templateUrl: 'vote.component.html',
  styleUrls: ['vote.component.css']
})
export class VoteComponent {
  @Input() type: string;
  @Input() id: number;
  constructor(
    private examHub: ExamHubService

  ) { }

  upVote(){
    this.examHub.postVote(1, this.id, this.type);
  }

  downVote(){
    this.examHub.postVote(-1, this.id, this.type);
  }
}
