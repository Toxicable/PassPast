import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-store';
import { AppSettings } from '../../app-settings';
import { AnswerActions } from './answers/answer.actions';
import { Answer } from './models/answer';
import { Dict } from './models/dict';
import { QuestionActions } from './questions/question.actions';

declare let signalR: any;

@Injectable()
export class ExamHubService {

  connection: any;
  groupId: number;

  constructor(
    private store: Store<AppState>,
    private answerActions: AnswerActions,
    private questionActions: QuestionActions,
  ) {

    if (this.connection != null) {
      return
    }
    let connection = new signalR.HubConnection(AppSettings.SignalRUrl);

    connection.on('BroadcastAnswer', (answer: Answer) => {
      let dictAnswer: Dict<Answer> = { [answer.id]: answer };

      this.store.dispatch(this.questionActions.addAnswer(answer));
      this.store.dispatch(this.answerActions.addSuccess(dictAnswer));
    });

    connection.start()
      .then(() => {
        this.connection = connection;

        this.store.select(state => state.courses.exam.selected)
          .filter(selectedId => selectedId !== null)
          .subscribe(selectedId => {
            this.groupId = selectedId.id
            //this.leaveRoom(selected.id);
            //leave all other groups
            this.joinRoom(this.groupId);
          });
      })


  }

  private joinRoom(roomNumber: number) {
    this.connection.invoke('JoinGroup', roomNumber)
  }
  private leaveRoom(roomNumber: number) {
    this.connection.invoke('LeaveGroup', roomNumber)
  }

  public postAnswer(questionId: number, content: string) {
    this.connection.invoke('PostAnswer', this.groupId, questionId, content)
  }

  public postVote(value: number, id: number, type: string) {
    this.connection.invoke('PostVote', value, id, type);
  }

  public postComment(content: string, id: number) {
    this.connection.invoke('PostComment', content, id)
  }
}
