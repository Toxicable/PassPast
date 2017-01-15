import { Component, OnInit } from '@angular/core';
import { PaperService } from './../paper.service';
import { Observable } from 'rxjs';
import { Paper } from '../../models/paper';
import { AppState } from '../../../../app/app-store';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AddPaperComponent } from './../add-paper/add-paper.component';
import { Store } from '@ngrx/store';
import { getSelectedPapers } from '../paper.reducer';
import { trackByIdentity } from '../../../utilities/track-by-id';
import { OpenIdClientService } from '@toxicable/oidc';

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
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private oidc: OpenIdClientService,
  ) { }

  ngOnInit() {
    this.papers$ = this.store.select(state => state.courses.paper.entities)
      .combineLatest(this.store.select(state => state.courses.course.selected),
      (papers, courseId) => getSelectedPapers(papers, courseId));

    this.loggedIn$ = this.oidc.loggedIn$;

    this.noPapers$ = this.store.select(state => state.loading)
      .flatMap(loading => this.papers$
        .map(papers => papers.length)
        .map(length => length === 0 && !loading)
      )
  }

  openNewPaperDialog() {
    this.newPaperDialogRef = this.dialog.open(AddPaperComponent, {
      disableClose: false
    });

    this.newPaperDialogRef.afterClosed()
      .subscribe(result => {
        this.newPaperDialogRef = null;
      });
  }


}
