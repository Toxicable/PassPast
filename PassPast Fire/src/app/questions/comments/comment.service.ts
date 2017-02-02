import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Comment, Course } from '../../models';

@Injectable()
export class CommentService {
  constructor(
  ) { }

  getComments(questionIds: number[]){
   // return this.authHttp.get('/comments/' + questionIds.join(','));
  }
}
