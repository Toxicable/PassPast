import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { Course } from '../models/course';
import * as paperActions from './paper.actions'
import { PaperService } from './paper.service';
import { Paper } from '../models/paper';

@Injectable()
export class PaperResolveService implements Resolve<void> {

  constructor(private papers: PaperService, 
              private router: Router,
              private store: Store<AppState>
              
              ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let paperId = route.params['paperId'];

    return this.store.map(state => state.courses.paper.entities)
      .first()
      .flatMap( (papers: Paper[]) => {
        let localPapers = papers.find( c => c.id == paperId)
        if(localPapers){
          let action = new paperActions.SelectAction(localPapers);
          this.store.dispatch(action);
          return Observable.of(true);
        }
        return this.papers.getPaper(paperId)
          .map((paper: Paper) => {
            if(paper != null){
              let addAction = new paperActions.AddAction(paper);
              this.store.dispatch(addAction);
              let action = new paperActions.SelectAction(paper);
              this.store.dispatch(action);
              return true;
            }
            return false;
          })
      });
  }
}