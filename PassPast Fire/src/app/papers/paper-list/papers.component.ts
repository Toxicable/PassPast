import { AuthService } from './../../core/auth.service';
import { RolesService } from './../../core/roles.service';
import { Component, OnInit } from '@angular/core';
import { PaperService } from './../paper.service';
import { Observable } from 'rxjs/Observable';
import { Paper } from '../../models/paper';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AddPaperComponent } from './../add-paper/add-paper.component';

import { trackByIdentity } from '../../utilities/track-by-id';
import { Router } from '@angular/router';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html'
})
export class PapersComponent implements OnInit {
  private newPaperDialogRef: MdDialogRef<AddPaperComponent>;
  papers$: Observable<Paper[]>;
  trackByFn = trackByIdentity;
  loggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(
    private papers: PaperService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private router: Router,
    private roles: RolesService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.papers$ = this.papers.list$;
    this.papers.selectCourse(this.route.snapshot.params['courseKey']);
    this.loggedIn$ = this.auth.loggedIn$;
    this.isAdmin$ = this.roles.isInRole('Admin');
  }

  openNewPaperDialog(isRequest = false) {
    this.newPaperDialogRef = this.dialog.open(AddPaperComponent, {
      disableClose: false
    });
    this.newPaperDialogRef.componentInstance.courseKey = this.route.snapshot.params['courseKey'];
    this.newPaperDialogRef.componentInstance.isRequest = isRequest;

    this.newPaperDialogRef.afterClosed()
      .subscribe(result => {
        this.newPaperDialogRef = null;
      });
  }


}
