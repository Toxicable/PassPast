import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-store';
import { coursesReducer } from './courses.store';


@Injectable()
export class ExamHubService {

private hubProxy: SignalR.Hub.Proxy;
  constructor(
    private store: Store<AppState>
  ) { }



  init() {

    return this.store.select(state => state.auth.authTokens)
      .first()
      .map(tokens => {
        let connection = $.hubConnection('api');
        connection.logging = true;
        connection.qs = { access_token: 'Bearer ' + tokens.access_token };
        let commentsHubProxy = connection.createHubProxy('commentsHub');

        commentsHubProxy.on('echo', (message: string) => {
          console.log(message);
        });

        connection.start()
          .done(() => {
            this.hubProxy = commentsHubProxy;
            this.store.select(state => state.courses.exam.selected)
              .first(selected => selected != null)
              .map(selected => this.hubProxy.invoke('JoinGroup', selected.id))
              .subscribe()
          })
          .fail(function () { console.log('Could not connect'); });
      });
  }

  postVote(value: number, id: number, type: string){
    this.hubProxy.invoke('PostVote', value, id, type)
  }



}
