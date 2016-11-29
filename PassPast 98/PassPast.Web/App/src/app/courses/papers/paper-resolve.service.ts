import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from '../../../app/app-store';
import { Store } from '@ngrx/store';
import { Course } from '../models/course';
import { PaperService } from './paper.service';
import { Paper } from '../models/paper';
import { PaperActions } from './paper.actions';
import { AlertService } from '../../../core/alert/alert.service';

@Injectable()
export class PaperResolveService implements Resolve<void> {

  constructor(private papers: PaperService, 
              private router: Router,
              private store: Store<AppState>,
              private paperActions: PaperActions,
              private alert: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let paperId = route.params['paperId'];

    return this.store.map(state => state.courses.paper.displayed)
      .first()
      .flatMap( (papers: Paper[]) => {
        let localPapers = papers.find( c => c.id === paperId);
        if(localPapers){
          this.store.dispatch(this.paperActions.Select(localPapers));
          return Observable.of(true);
        }
        return this.papers.getPaper(paperId)
          .map((paper: Paper) => {
            if(paper != null){
              this.store.dispatch(this.paperActions.Add(paper));
              this.store.dispatch(this.paperActions.Select(paper));
              return true;
            }

            this.alert.sendWarning('Paper does not exist');
            return false;
          })
      });
  }
}