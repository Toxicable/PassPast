import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Answer } from '../../../models';

@Component({
  selector: 'app-answer-short',
  templateUrl: './answer-short.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AnswerShortComponent {
  @Input() answer: Answer;
  @Input() loggedIn: boolean;
}
