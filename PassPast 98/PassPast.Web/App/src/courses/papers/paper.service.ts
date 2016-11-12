import { Injectable } from '@angular/core';
import { AuthApiService } from '../../core/services/auth-api.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import * as paperActions from './paper.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';
import { Paper } from '../models/paper';

@Injectable()
export class PaperService {
    constructor(private authApi: AuthApiService,
                private store: Store<AppState>
                ) { }

    getCourses(): Observable<Paper[]>{
        return this.authApi.get('/papers/getAll')
            .do((papers: Paper[]) => { 
                let action = new paperActions.LoadAction(papers);
                this.store.dispatch(action);
            })
    }

    create(course: Course): Observable<Paper>{
        return this.authApi.post('/papers/create', course)
            .do((newPaper: Paper) => {
                let action = new paperActions.AddAction(newPaper);
                this.store.dispatch(action);
            })
    }
}