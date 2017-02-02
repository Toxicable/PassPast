import { Component, OnInit } from '@angular/core';
import { PaperService } from '../paper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../core';
import { ActivatedRoute } from '@angular/router';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'add-paper',
  templateUrl: './add-paper.component.html'
})
export class AddPaperComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  newPaperForm: FormGroup
  courseId: string;
  constructor(
    private papers: PaperService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private af: AngularFire,
  ) { }


  ngOnInit(): void {
    this.newPaperForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    debugger
    let courseId = this.route.snapshot.params['courseId']
    let paper =
      Object.assign(this.newPaperForm.value,
      {courseId: this.courseId})
    this.af.database.list('/papers').push(paper)
    //this.store.dispatch(this.paperActions.add(this.newPaperForm.value))
  }
}
