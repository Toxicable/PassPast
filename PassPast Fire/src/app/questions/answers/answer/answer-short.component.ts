import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-answer-short',
  templateUrl: './answer-short.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerShortComponent {
  @Input() answer: Answer;
  @Input() loggedIn: boolean;
}
