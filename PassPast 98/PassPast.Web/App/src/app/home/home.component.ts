import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { AppState } from '../app-store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getDisplayed } from '../courses/questions/question.reducer';

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


  }

  send() {
    this.connection.invoke('Echo', "hi", 'json')
  }

}
