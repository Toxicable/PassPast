import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../app-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loading-bar',
  template: `
<div style="height:5px;">
    <md-progress-bar mode="indeterminate" *ngIf="loading$ | async" color="accent"></md-progress-bar>
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }


  ngOnInit(): void {
    this.loading$ = this.store.select(state => state.loading);
  }
}


