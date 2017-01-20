import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { AuthHttp } from '../../core';
import { Http } from '@angular/http';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {
  constructor(
    private authHttp: AuthHttp,
  ) { }

  getComments(questionIds: number[]): Observable<Comment[]> {
    return this.authHttp.get('/comments/' + questionIds.join(','));
  }
}
