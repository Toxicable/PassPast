import { Component, OnInit } from '@angular/core';
import { PaperService } from './../paper.service';
import { Observable } from 'rxjs/Observable';
import { Paper } from '../../models/paper';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AddPaperComponent } from './../add-paper/add-paper.component';
import { Store } from '@ngrx/store';
import { trackByIdentity } from '../../utilities/track-by-id';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html'
})
export class PapersComponent implements OnInit {
  private newPaperDialogRef: MdDialogRef<AddPaperComponent>;
  papers$: Observable<Paper[]>;
  trackByFn = trackByIdentity;
  loggedIn$: Observable<boolean>;
  noPapers$: Observable<boolean>;

  constructor(
    private papers: PaperService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private af: AngularFire,
    private router: Router,
  ) { }

  ngOnInit() {
    this.papers$ = this.af.database.list('/papers', {
      query: {
        orderByChild: 'courseId',
        equalTo: this.route.snapshot.params['courseId'],
      }
    });
  }

  openNewPaperDialog() {
    this.newPaperDialogRef = this.dialog.open(AddPaperComponent, {
      disableClose: false
    });
    this.newPaperDialogRef.componentInstance.courseId = this.route.snapshot.params['courseId'];

    this.newPaperDialogRef.afterClosed()
      .subscribe(result => {
        this.newPaperDialogRef = null;
      });
  }


}
