import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core'
import { Observable} from "rxjs/Observable";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';

@Component({
    selector: 'loading-bar',
    template: `
<div style="height:5px;">
    <md-progress-bar *ngIf="loading$ | async" mode="indeterminate"></md-progress-bar>
</div>`,
    styleUrls: ['loading-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent implements OnInit {
    constructor(private store: Store<AppState>
    ) { }

    loading$ : Observable<boolean>;

    ngOnInit(): void {
        this.loading$ = this.store.select( state => state.loading);
    }
}


