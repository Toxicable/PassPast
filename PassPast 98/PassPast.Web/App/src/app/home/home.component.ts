import { Component } from '@angular/core';
import { Observable,  } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotFoundComponent } from '../not-found/not-found.component';

declare let window: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    dialogRef: MdDialogRef<NotFoundComponent>;
    constructor(private dialog: MdDialog){}

    openDialog() {
        this.dialogRef = this.dialog.open(NotFoundComponent, {
            disableClose: false
        });

        this.dialogRef.afterClosed().subscribe(result => {
        console.log('result: ' + result);
        this.dialogRef = null;
    });
    }
}
