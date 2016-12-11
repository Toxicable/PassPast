import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddPaperComponent } from '../add-paper/add-paper.component';
import { Paper } from '../../models/paper';
import { PaperService } from '../paper.service';
import { AlertService } from '../../../../core/alert/alert.service';
import { AppState } from '../../../app-store';
import { denormalizePapers, getSelectedPaper, getPapersSelectedByCourse } from '../paper.reducer';

@Component({
    selector: 'app-papers',
    templateUrl: 'papers.component.html'
})
export class PapersComponent implements OnInit {
    private newPaperDialogRef: MdDialogRef<AddPaperComponent>;
    papers$: Observable<Paper[]>;

    constructor(private papers: PaperService,
                private alert: AlertService,
                private store: Store<AppState>,
                private route: ActivatedRoute,
                private dialog: MdDialog
    ) { }

    openNewPaperDialog() {
        this.newPaperDialogRef = this.dialog.open(AddPaperComponent, {
            disableClose: false
        });

        this.newPaperDialogRef.afterClosed()
            .subscribe(result => {
                this.newPaperDialogRef = null;
        });
    }

    ngOnInit() {
        this.papers$ = this.store.select( state => state.courses)
        .map(state => getPapersSelectedByCourse(state));

     }
}
