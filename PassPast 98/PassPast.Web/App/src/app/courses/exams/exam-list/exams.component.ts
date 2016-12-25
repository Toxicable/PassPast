import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../../app/app-store';
import { Observable } from 'rxjs';
import { Exam } from '../../models/exam';
import { ExamService } from './../exam.service';
import { Store } from '@ngrx/store';
import { AddExamComponent } from './../add-exam/add-exam.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { trackByIdentity } from '../../../../util/track-by-id';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html'
})
export class ExamsComponent implements OnInit {
  private newExamDialogRef: MdDialogRef<AddExamComponent>;
  exams$: Observable<Exam[]>;
  trackByFn = trackByIdentity;

  constructor(
    private store: Store<AppState>,
    private exams: ExamService,
    private dialog: MdDialog,

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
    this.exams$ = this.store.select(state => state.courses.exam.entities);
  }
}
