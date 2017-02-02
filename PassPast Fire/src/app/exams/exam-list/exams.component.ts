import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Exam } from '../../models/exam';
import { ExamService } from './../exam.service';
import { Store } from '@ngrx/store';
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
  ) { }

  ngOnInit() {

    this.exams$ = this.af.database.list('/exams', {
      query: {
        orderByChild: 'paperId',
        equalTo: this.route.snapshot.params['paperId'],
      }
    });

    // this.exams$ = this.store.select(state => state.courses.exam.entities);
    // this.loggedIn$ = this.oidc.loggedIn$;

    // this.noExams$ = this.store.select(state => state.loading)
    //   .flatMap(loading => this.exams$
    //     .map(papers => papers.length)
    //     .map(length => length === 0 && !loading)
    //   );
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
