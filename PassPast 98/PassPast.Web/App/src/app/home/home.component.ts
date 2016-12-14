import { Component, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { AppState } from '../app-store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getDisplayed } from '../courses/questions/question.reducer';
import { Observable } from 'rxjs';
import { type } from '../../util/action-name-helper';
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
    private store: Store<AppState>,
    private router: Router
  ) { }
  ngOnInit(){
    console.log(this.router)
  }



}
