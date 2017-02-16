import { FormValidators } from 'angular-validators';
import { RequestService } from './../../core/request.service';
import { Component, OnInit } from '@angular/core';
import { PaperService } from '../paper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  newPaperForm: FormGroup;
  courseKey: string;
  isRequest = false;

  constructor(
    private papers: PaperService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private af: AngularFire,
    private requests: RequestService,
  ) { }


  ngOnInit(): void {
    this.newPaperForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    }, {
        asyncValidator: FormValidators.composeAsync(
          this.isRequest ? [this.paperExistsValidator.bind(this), this.requestExistsValidator.bind(this)] :
            [this.paperExistsValidator.bind(this)]
        )
      });
  }

  paperExistsValidator(group: FormGroup) {
    return this.papers.checkExists(group.value)
      .map(exists => exists ? { paperExists: true } : null);
  }

  requestExistsValidator(group: FormGroup) {
    return this.requests.checkExisting(group.value).first()
      .map(exists => exists ? { requestExists: true } : null);
  }

  onSubmit() {
    if (!this.isRequest) {
      this.papers.create(this.newPaperForm.value, this.courseKey);
    } else {
      this.requests.create(Object.assign({}, this.newPaperForm.value, {courseKey: this.courseKey}), 'paper');
    }
    this.newPaperForm.reset();
  }
}
