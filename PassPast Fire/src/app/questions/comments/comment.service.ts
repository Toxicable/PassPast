import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {
  constructor(
  ) { }

  getComments(questionIds: number[]){
   // return this.authHttp.get('/comments/' + questionIds.join(','));
  }
}
