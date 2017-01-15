import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../../app/app-store';
import { Observable } from 'rxjs/Observable';
import { Exam } from '../../models/exam';
import { ExamService } from './../exam.service';
import { Store } from '@ngrx/store';
import { AddExamComponent } from './../add-exam/add-exam.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { trackByIdentity } from '../../../utilities/track-by-id';
import { OpenIdClientService } from '@toxicable/oidc';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html'
})
export class ExamsComponent implements OnInit {
  private newExamDialogRef: MdDialogRef<AddExamComponent>;
  exams$: Observable<Exam[]>;
  trackByFn = trackByIdentity;
  loggedIn$: Observable<boolean>;
  noExams$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private exams: ExamService,
    private dialog: MdDialog,
    private oidc: OpenIdClientService,
  ) { }

  ngOnInit() {
    this.exams$ = this.store.select(state => state.courses.exam.entities);
    this.loggedIn$ = this.oidc.loggedIn$;

    this.noExams$ = this.store.select(state => state.loading)
      .flatMap(loading => this.exams$
        .map(papers => papers.length)
        .map(length => length === 0 && !loading)
      );
  }
  openNewExamDialog() {
    this.newExamDialogRef = this.dialog.open(AddExamComponent, {
      disableClose: false
    });

    this.newExamDialogRef.afterClosed().subscribe(result => {
      this.newExamDialogRef = null;
    });
  }

}
