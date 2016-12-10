import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignalrExamHubService } from '../../signalr-exam-hub.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: 'new-comment.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewCommentComponent implements OnInit {
  newCommentForm: FormGroup;

  @Input() id: number

  constructor(
    private formBuilder: FormBuilder,
    private examHub: SignalrExamHubService
  ) { }

  ngOnInit() {
    this.newCommentForm = this.formBuilder.group({
      content: ['']
    });
  }

  sendComment(){
    this.examHub.postComment(this.newCommentForm.value['content'], this.id)
  }
}
