import { Component, OnInit } from '@angular/core';
import { PaperService } from './paper.service';
import { Observable } from 'rxjs';
import { Paper } from '../models/paper';
import { AppState } from '../../../app/app-store';
import { Course } from '../models/course';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '../../../core/alert/alert.service';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AddPaperComponent } from './add-paper/add-paper.component';
import { Store } from '@ngrx/store';

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

        this.newPaperDialogRef.afterClosed().subscribe(result => {
            this.newPaperDialogRef = null;
        });
    }

    ngOnInit() {
        this.store.map( state=> state.courses.course.selected.id)
        .subscribe( (courseId: number) => {
            this.papers$ = this.store.map( state => state.courses.paper.entities)
                .map((courses: Paper[]) => {
                    return courses.filter((paper: Paper) => paper.courseId == courseId)
                });
            });

        this.papers.getPapers()
            .subscribe();
     }
}