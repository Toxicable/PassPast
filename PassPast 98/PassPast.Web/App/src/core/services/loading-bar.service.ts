import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';

@Injectable()
export class LoadingBarService{
    constructor(private store: Store<AppState>) {}

    load(){
        this.store.dispatch({type: "START_LOADING"})
    }

    done(){
        this.store.dispatch({type: "DONE_LOADING"})
    }

    doWithLoader<T>(task: Observable<T>): Observable<T>{
        return Observable
            .of(true)
            .do(() => this.load())
            .flatMap(() => task)
            .finally( () => this.done());
    }
}