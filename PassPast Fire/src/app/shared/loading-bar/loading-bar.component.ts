import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

  ) { }


  ngOnInit(): void {
   // this.loading$ = this.store.select(state => state.loading);
  }
}


