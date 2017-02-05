import { Observable } from 'rxjs/Observable';
import { VoteService } from './../../votes/vote.service';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Answer } from '../../../models';

@Component({
  selector: 'app-answer-mcq',
  templateUrl: './answer-mcq.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
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
export class AnswerMcqComponent implements OnInit{
  @Input() answer: Answer;
  @Input() totalAnswerVotes: number;
  @Input() loggedIn: boolean;
  vote: Observable<any>;

  constructor(
    private votes: VoteService,
  ) {
  }

  ngOnInit(){
    this.vote = this.votes.getVote('answer', this.answer.$key);
  }

  sendVote() {
    if (this.loggedIn) {
      this.votes.create(1, 'answer', this.answer.$key)
    }
  }

}
