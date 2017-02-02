import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  @Input() comment: Comment;
  @Input() loggedIn: boolean;
}
