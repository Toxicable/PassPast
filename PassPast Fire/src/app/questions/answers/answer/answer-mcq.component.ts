import { Vote } from './../../../models/vote';
import { Observable } from 'rxjs/Observable';
import { VoteService } from './../../votes/vote.service';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Answer } from '../../../models';

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
export class AnswerMcqComponent implements OnInit {
  @Input() answer: Answer;
  @Input() totalAnswerVotes: number;
  @Input() loggedIn: boolean;

  constructor(
    private votes: VoteService,
  ) {
  }

  ngOnInit() {
  }

  sendVote() {
    if (this.loggedIn) {
      this.votes.create(1, this.answer.$key, true);
    }
  }

}
