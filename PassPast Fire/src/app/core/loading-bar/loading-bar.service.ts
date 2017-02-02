import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store';
import { Store } from '@ngrx/store';
import { LoadingBarActions } from './loading-bar.actions';

@Injectable()
export class LoadingBarService {
  constructor(

    private loadingBarActions: LoadingBarActions,
  ) { }

  load() {
   // this.store.dispatch(LoadingBarActions.start());
  }

  done() {
   // this.store.dispatch(LoadingBarActions.done());
  }

  doWithLoader<T>(task: Observable<T>): Observable<T> {
    return Observable
      .of(true)
      .do(() => this.load())
      .flatMap(() => task)
      .finally( () => this.done());
  }
}
