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
            .map((papers: Paper[]) => papers.length === 1 ? papers[1] : null);
    }

    getPapers(courseId: number): Observable<Paper[]> {
        return this.store.map(state => state.courses.paper.cache)
            .first()
            .flatMap(papers => {
                // check if there's any papers with the same course id
                let existingPapers = papers.filter( paper => paper.courseId === courseId);

                // if there's even 1 then they all should be there so we're good to not fetch... probably :D
                if (existingPapers.length > 0) {
                    return Observable.of(existingPapers)
                        .do(alsoExistingPapers => this.store.dispatch(this.paperActions.display(alsoExistingPapers)));
                }

                // if we got here then it looks like we have to fetch some new ones
                return this.authHttp.get('/papers/' + courseId)
                    .do((fetchedPapers: Paper[]) => {
                        // store them to be  displayed
                        this.store.dispatch(this.paperActions.display(fetchedPapers));

                        // throw them in the cache aswell
                        this.store.dispatch(this.paperActions.cache(fetchedPapers));
                    });
            });
    }

    create(paper: Paper): Observable<Paper> {
        return this.authHttp.post('/papers', paper)
            .do((newPaper: Paper) => {
                this.store.dispatch(this.paperActions.Add(newPaper));
            });
    }
}
