import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../../models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignalrExamHubService } from '../../signalr-exam-hub.service';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  private _question: Question;
  private showComments: boolean = false;

  @Input()
  set question(question: Question) {
    // sum the votes for this answers for this question
    let totalAnswerVotes = question.answers
      .map(a => +a.totalVotes)
      .reduce((previousVote, currentVote) => previousVote + currentVote, 0);
    this._question = Object.assign({}, question, { totalAnswerVotes });
  }
  constructor(
    private examHub: SignalrExamHubService,
  ) { }

}
