import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../models/question';

@Component({
    selector: 'app-question',
    templateUrl: 'question.component.html'
})
export class QuestionComponent implements OnInit {
    @Input() question: Question;
    constructor() { }

ngOnInit() { }
}