import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-store';
import { environment } from '../../environments/environment';
import { AnswerActions } from './answers/answer.actions';
import { Answer } from './models/answer';
import { Dict } from './models/dict';
import { Observable } from 'rxjs/Observable';
import { Comment } from './models/comment';
import { CommentActions } from './comments/comment.actions';
import { OpenIdClientService } from '@toxicable/oidc';

declare let signalR: any;

@Injectable()
export class ExamHubService {

  connection: any;
  groupId: number;

  connecting: Promise<any>;

  constructor(
    private store: Store<AppState>,
    private answerActions: AnswerActions,
    private commentActions: CommentActions,
    private oidc: OpenIdClientService,
  ) {
    this.connection = new signalR.HubConnection(environment.signalRUrl);

    this.connection.on('BroadcastAnswer', (answer: Answer) => {

      this.store.dispatch(this.answerActions.addSuccess(answer));
    });

    this.connection.on('BroadcastComment', (comment: Comment) => {
      this.store.dispatch(this.commentActions.addSuccess(comment));
    });

    this.connection.on('BroadcastAnswerVote', (answer: Answer) => {
      this.store.dispatch(this.answerActions.updateVotes(answer));
    });

    this.connection.on('BroadcastCommentVote', (comment: Comment) => {
      this.store.dispatch(this.commentActions.updateVotes(comment));
    });

    this.connecting = this.connection.start();
  }

  joinRoom(roomNumber: number) {
    this.connecting
      .then(() => {
        this.groupId = roomNumber;
        this.connection.invoke('JoinGroup', roomNumber);
      })
  }
  leaveCurrentRoom() {
    if (this.groupId) {
      this.connection.invoke('LeaveGroup', this.groupId);
    }
  }

  postAnswer(questionId: number, content: string) {
    return this.getUserId()
      .map(userId => this.connection.invoke('PostAnswer', this.groupId, { questionId, contentOrIncriment: content }, userId));
  }

  postAnswerVote(value: number, answerId: number, type: string) {
    return this.getUserId()
      .map(userId => this.connection.invoke('PostAnswerVote', this.groupId, { value, answerId }, type, userId));
  }

  postCommentVote(value: number, commentId: number) {
    return this.getUserId()
      .map(userId => this.connection.invoke('PostCommentVote', this.groupId, { value, commentId }, userId));
  }

  postComment(content: string, questionId: number) {
    return this.getUserId()
      .map(userId => this.connection.invoke('PostComment', this.groupId, { content, questionId }, userId));
  }
  private getUserId() {
    return this.oidc.profile$
      .map(profile => profile.sub);
  }
}


