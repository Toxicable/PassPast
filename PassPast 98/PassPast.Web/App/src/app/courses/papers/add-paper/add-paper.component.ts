import { Component, OnInit } from '@angular/core';
import { PaperService } from '../paper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../../app/app-store';
import { Store } from '@ngrx/store';
import { AlertService } from '../../../../core/alert/alert.service';

@Component({
  selector: 'add-paper',
  templateUrl: 'add-paper.component.html'
})
export class AddPaperComponent implements OnInit {
  constructor(
    private papers: PaperService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
    private
  ) { }

  newPaperForm: FormGroup

  ngOnInit(): void {
    this.newPaperForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.store.dispatch
    this.store.select(state => state.courses.course.entities.id)
      .first()
      .flatMap((id: number) => {
        let newPaper = Object.assign({}, { courseId: id }, this.newPaperForm.value);
        return this.papers.create(newPaper);
      })
      .subscribe(() => this.alert.sendSuccess("Successfully crreated the Paper :D"));
  }

}
