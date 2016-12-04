import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { Paper } from '../models/paper';
import { AuthHttp } from '../../../core/auth-http/auth-http.service';
import { PaperActions } from './paper.actions';

@Injectable()
export class PaperService {
  constructor(private authHttp: AuthHttp,
    private store: Store<AppState>,
    private paperActions: PaperActions
  ) { }

  getPaper(id: number): Observable<Paper> {
    return this.authHttp.get('/papers/' + id)
      .map((papers: Paper[]) => papers.length === 1 ? papers[0] : null);
  }

  getPapers(courseId: number): Observable<Paper[]> {
    return this.authHttp.get('/papers/' + courseId);
  }

  create(paper: Paper): Observable<Paper> {
    return this.authHttp.post('/papers', paper)
      .do((newPaper: Paper) => {
        this.store.dispatch(this.paperActions.Add(newPaper));
      });
  }
}
