import { Vote,  } from './../../models';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { VoteService } from './vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent {
  @Input() key: string;
  @Input() loggedIn: boolean;
  @Input() sum: number;
  @Input() userVoteValue;

  constructor(
    private votes: VoteService
  ) { }


  upVote() {
    if (this.loggedIn) {
      this.votes.create(1, this.key);
    }
  }

  downVote() {
    if (this.loggedIn) {
      this.votes.create(-1, this.key);
    }
  }
}
