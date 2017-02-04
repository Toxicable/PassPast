import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Exam } from '../../models/exam';
import { ExamService } from './../exam.service';

import { AddExamComponent } from './../add-exam/add-exam.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { trackByIdentity } from '../../utilities/track-by-id';
import { AngularFire } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';

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
    private exams: ExamService,
    private dialog: MdDialog,
    private af: AngularFire,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.loggedIn$ = this.auth.loggedIn$;
    this.exams$ = this.exams.exams$;
    this.exams.selectPaper(this.route.snapshot.params['paperKey']);
  }
  openNewExamDialog() {
    this.newExamDialogRef = this.dialog.open(AddExamComponent, {
      disableClose: false
    });
    this.newExamDialogRef.componentInstance.paperKey = this.route.snapshot.params['paperKey'];
    this.newExamDialogRef.afterClosed().subscribe(result => {
      this.newExamDialogRef = null;
    });
  }

}
