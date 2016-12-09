import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamHubService } from '../../exam-hub.service';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html'
})
export class QuestionComponent implements OnInit {
  newCommentForm: FormGroup;

  private _question: Question;

  @Input()
  set question(question: Question) {
    let totalAnswerVotes = question.answers
      .map(a => +a.totalVotes)
      .reduce((previousVote, currentVote) => previousVote + currentVote, 0);
    this._question = Object.assign({}, question, { totalAnswerVotes });
  }
  constructor(
    private examHub: ExamHubService,
    private formBuilder: FormBuilder

  ) { }


  ngOnInit() {
    this.newCommentForm = this.formBuilder.group({
      content: ['']
    });
  }


  sendComment(questionId: string) {
    //this.commentsHub.server.post(this.newCommentForm.value['content'], questionId);
  }

}
