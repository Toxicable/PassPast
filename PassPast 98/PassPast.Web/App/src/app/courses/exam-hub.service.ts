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

    this.start();

  }

  start(){
    this.oidc.tokens$.first().subscribe(t => {
      this.connecting = this.connection.start(!!t ? t.access_token : '');
    });
  }
  stop(){
    this.connection.stop();
  }

  joinRoom(roomNumber: number) {
    this.connecting
      .then(() => {
        this.groupId = roomNumber;
        this.connection.invoke('JoinGroup', roomNumber);
      });
  }
  leaveCurrentRoom() {
    if (this.groupId) {
      this.connection.invoke('LeaveGroup', this.groupId);
    }
  }

  postAnswer(questionId: number, content: string) {
    this.connection.invoke('PostAnswer', this.groupId, { questionId, contentOrIncriment: content });
  }

  postAnswerVote(value: number, answerId: number, type: string) {
    this.connection.invoke('PostAnswerVote', this.groupId, { value, answerId }, type);
  }

  postCommentVote(value: number, commentId: number) {
    this.connection.invoke('PostCommentVote', this.groupId, { value, commentId });
  }

  postComment(content: string, questionId: number) {
    this.connection.invoke('PostComment', this.groupId, { content, questionId });
  }
}


