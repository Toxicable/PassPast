import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { AppState } from '../app-store';
import { Store } from '@ngrx/store';

declare let signalR: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
    private store: Store<AppState>
  ) { }

  connection: any;

  connect() {
    this.store.select(state => state.auth)
      .first()
      .subscribe(auth => {
         console.log(auth)
            let connection = new signalR.HubConnection(`http://localhost:5000/api/exam-hub`, 'formatType=json&format=text&access_token=bearer ' + auth.authTokens.access_token);
            console.log(connection)
//&access_token=' + auth.authTokens.access_token
      connection.on('Send', function (message: any) {
      });

      connection.start(auth.authTokens.access_token);
      this.connection = connection;

      })

  }

  send() {
    this.connection.invoke('Echo', "hi", 'json')
  }

}
