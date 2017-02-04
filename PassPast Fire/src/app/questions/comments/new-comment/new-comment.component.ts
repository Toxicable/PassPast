import { CommentService } from './../comment.service';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCommentComponent implements OnInit {
  newCommentForm: FormGroup;

  @Input() questionKey: string;
  @Input() loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private comments: CommentService,
  ) { }

  ngOnInit() {
    this.newCommentForm = this.formBuilder.group({
      content: {value: '', disabled: !this.loggedIn}
    });
  }

  sendComment(){
    this.comments.create(this.newCommentForm.value, this.questionKey);
    this.newCommentForm.reset();
  }
}
