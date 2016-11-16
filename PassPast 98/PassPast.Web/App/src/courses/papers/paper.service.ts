import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import * as paperActions from './paper.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';
import { Paper } from '../models/paper';
import { AuthHttp } from '../../core/auth-http/auth-http.service';
import { PaperActions } from './paper.actions';

@Injectable()
export class PaperService {
    constructor(private authHttp: AuthHttp,
                private store: Store<AppState>,
                private paperActions: PaperActions
    ) { }

    getPaper(id: number): Observable<Paper>{
        return this.authHttp.get('/papers/get/'+ id)
    }

    getPapers(): Observable<Paper[]>{
        return this.authHttp.get('/papers/getAll')
            .do((papers: Paper[]) => { 
                this.store.dispatch(this.paperActions.Load(papers));
            })
    }

    create(paper: Paper): Observable<Paper>{
        return this.authHttp.post('/papers/create', paper)
            .do((newPaper: Paper) => {
                this.store.dispatch(this.paperActions.Add(newPaper));
            })
    }
}