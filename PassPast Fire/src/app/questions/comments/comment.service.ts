import { AuthService } from './../../core/auth.service';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http } from '@angular/http';
import { Comment, Course } from '../../models';

@Injectable()
export class CommentService {
  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) { }

  getComments(questionKey: string) {
    return this.af.database.list('/comments', {
      query: {
        orderByChild: 'questionKey',
        equalTo: questionKey
      }
    });
  }
  create(form: { content: string }, questionKey: string) {
    this.auth.uid$.first().subscribe(uid => {
      const comment: Comment = {
        createdAt: new Date().toISOString(),
        createdBy: uid,
        content: form.content,
        questionKey,
        voteValue: 0,
        votesSum: 0
      };
      this.af.database.list('/comments').push(comment);
    })
  }
}
