import { Component, OnInit } from '@angular/core';
import { PaperService } from '../paper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../../app/app-store';
import { Store } from '@ngrx/store';
import { AlertService } from '../../../../core/alert/alert.service';
import { PaperActions } from '../paper.actions';

@Component({
  selector: 'add-paper',
  templateUrl: 'add-paper.component.html'
})
export class AddPaperComponent implements OnInit {
  constructor(
    private papers: PaperService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private paperActions: PaperActions,
  ) { }

  newPaperForm: FormGroup

  ngOnInit(): void {
    this.newPaperForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.store.dispatch(this.paperActions.add(this.newPaperForm.value))
  }
}
