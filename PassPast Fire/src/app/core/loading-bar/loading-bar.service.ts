import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../app-store';


@Injectable()
export class LoadingBarService {
  private isLoading:BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
  ) {
    this.isLoading = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoading.asObservable();
  }

  load() {
    this.isLoading.next(true);
  }

  done() {
    this.isLoading.next(false);
  }

  doWithLoader<T>(task: Observable<T>): Observable<T> {
    return Observable
      .of(true)
      .do(() => this.load())
      .flatMap(() => task)
      .finally(() => this.done());
  }
}
