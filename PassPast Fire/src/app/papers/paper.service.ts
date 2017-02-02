import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';
import { Paper } from '../models/paper';

@Injectable()
export class PaperService {
  constructor(

  ) { }

  getPaper(id: number) {
   // return this.authHttp.get('/papers/' + id);
  }

  getPapers(){
   // return this.authHttp.get('/papers');
  }

  getRelatedPapers(courseId: number) {
  //  return this.authHttp.get(`/courses/${courseId}/papers`);
  }

  create(paper: Paper) {
   // return this.authHttp.post('/papers', paper);
  }
}
