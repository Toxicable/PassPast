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
export class CourseResolveService implements Resolve<void> {

  constructor(private courses: PaperService, 
              private router: Router,
              private store: Store<AppState>
              
              ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let courseId = route.params['paperId'];

    return this.store.map(state => state.courses.paper.entities)
      .first()
      .flatMap( (courses: Paper[]) => {
        let localCourse = courses.find( c => c.id == courseId)
        if(localCourse){
          let action = new paperActions.SelectAction(localCourse);
          this.store.dispatch(action);
          return Observable.of(true);
        }
        return this.courses.getCourse(courseId)
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