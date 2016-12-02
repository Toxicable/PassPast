import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { CommentsHubService } from '../courses/comments/comments-hub.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-store';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private dialog: MdDialog,
                private snackBar: MdSnackBar,
                private store: Store<AppState>
    ) { }

logState(){
    this.store.first().subscribe(state => console.log(JSON.stringify(state)));
}

 failedAttempt() {
   this.snackBar.open('It didn\'t quite work!', 'Try Again');
 }

}
