import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-store';
import { AppSettings } from '../../app-settings';


declare let signalR: any;

@Injectable()
export class SignalrExamHubService {

  connection: any;
  groupId: number;

  constructor(private store: Store<AppState>) {

    if (this.connection != null) {
      return
    }
    let connection = new signalR.HubConnection(AppSettings.SignalRUrl);

    connection.on('Send', function (message: any) {
    });

    connection.start()
      .then(() => {
        this.connection = connection;

        this.store.select(state => state.courses.exam.selected)
          .filter(selected => selected !== null)
          .subscribe(selected => {
            this.groupId = selected.id
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
    this.connection.invoke('PostAnswer', questionId, content)
  }

  public postVote(value: number, id: number, type: string) {
    this.connection.invoke('PostVote', value, id, type);
  }

  public postComment(content: string, id: number) {
    this.connection.invoke('PostComment', content, id)
  }
}
