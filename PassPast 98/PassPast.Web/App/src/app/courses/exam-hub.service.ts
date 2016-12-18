import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-store';
import { AppSettings } from '../../app-settings';
import { AnswerActions } from './answers/answer.actions';
import { Answer } from './models/answer';
import { Dict } from './models/dict';
import { QuestionActions } from './questions/question.actions';
import { Observable } from 'rxjs/Observable';
import { Comment } from './models/comment';
import { CommentActions } from './comments/comment.actions';

declare let signalR: any;

@Injectable()
export class ExamHubService {

  connection: any;
  groupId: number;

  connecting: Promise<any>;

  constructor(
    private store: Store<AppState>,
    private answerActions: AnswerActions,
    private questionActions: QuestionActions,
    private commentActions: CommentActions,
  ) {
    this.connection = new signalR.HubConnection(AppSettings.SignalRUrl);

    this.connection.on('BroadcastAnswer', (answer: Answer) => {
      let dictAnswer: Dict<Answer> = { [answer.id]: answer };

      this.store.dispatch(this.questionActions.addAnswer(answer));
      this.store.dispatch(this.answerActions.addSuccess(dictAnswer));
    });

    this.connection.on('BroadcastComment', (comment: Comment) => {
      let dictComment: Dict<Comment> = { [comment.id]: comment };

      this.store.dispatch(this.questionActions.addComment(comment));
      this.store.dispatch(this.commentActions.addSuccess(dictComment));
    })

    this.connection.on('BroadcastAnswerVote', (answer: Answer) => {
      let dictAnswer: Dict<Answer> = { [answer.id]: answer };

      this.store.dispatch(this.answerActions.updateVotes(dictAnswer));
    })

    this.connection.on('BroadcastCommentVote', (comment: Comment) => {
      let dictComment: Dict<Comment> = { [comment.id]: comment };

      this.store.dispatch(this.commentActions.updateVotes(dictComment));
    })

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
    this.connection.invoke('PostAnswer', this.groupId, { questionId, contentOrIncriment: content });
  }

  postAnswerVote(value: number, answerId: number) {
    this.connection.invoke('PostAnswerVote', this.groupId, { value, answerId });
  }

  postCommentVote(value: number, commentId: number) {
    this.connection.invoke('PostCommentVote', this.groupId, { value, commentId });
  }

  postComment(content: string, questionId: number) {
    this.connection.invoke('PostComment', this.groupId, { content, questionId });
  }
}


