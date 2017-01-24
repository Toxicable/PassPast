import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamHubService } from '../../exam-hub.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCommentComponent implements OnInit {
  newCommentForm: FormGroup;

  @Input() questionId: number;
  @Input() loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private examHub: ExamHubService
  ) { }

  ngOnInit() {
    this.newCommentForm = this.formBuilder.group({
      content: {value: '', disabled: !this.loggedIn}
    });
  }

  sendComment(){
    this.examHub.postComment(this.newCommentForm.value['content'], this.questionId)
    this.newCommentForm.reset();
  }
}
