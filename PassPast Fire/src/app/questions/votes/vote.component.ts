import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { VoteService } from './vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class VoteComponent implements OnInit {
  @Input() type: 'comment' | 'answer';
  @Input() key: string;
  @Input() loggedIn: boolean;
  vote: Observable<{sum: number; userValue: number}>;
  constructor(
    private votes: VoteService
  ) { }

  ngOnInit(){
    this.vote = this.votes.getVote(this.type, this.key)
  }

  upVote() {
    if (this.loggedIn) {
      this.votes.create(1, this.type, this.key);
    }
  }

  downVote() {
    if (this.loggedIn) {
      this.votes.create(-1, this.type, this.key);
    }
  }
}
