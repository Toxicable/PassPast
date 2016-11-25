import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app/app-store';
import { PaperService } from '../papers/paper.service';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam';
import { ExamService } from './exam.service';
import { Store } from '@ngrx/store';
import { AddExamComponent } from './add-exam/add-exam.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-exams',
    templateUrl: 'exams.component.html'
})
export class ExamsComponent implements OnInit {
    private newExamDialogRef: MdDialogRef<AddExamComponent>;
    exams$: Observable<Exam[]>;

    constructor(private store: Store<AppState>,
                private exams: ExamService,
                private dialog: MdDialog

    ) { }

    openNewExamDialog() {
        this.newExamDialogRef = this.dialog.open(AddExamComponent, {
            disableClose: false
        });

        this.newExamDialogRef.afterClosed().subscribe(result => {
            this.newExamDialogRef = null;
        });
    }

    ngOnInit() {
        this.store.map( state => state.courses.paper.selected.id)
        .subscribe( (paperId: number) => {
            this.exams$ = this.store.map( state => state.courses.exam.entities)
                .map((exams: Exam[]) => {
                    return exams.filter((paper: Exam) => paper.paperId === paperId);
                });
            });

        this.exams.getExams()
            .subscribe();
     }
}