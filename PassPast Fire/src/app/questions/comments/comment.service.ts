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
    this.auth.profile$.first().subscribe(profile => {
      const comment: Comment = {
        createdAt: new Date().toISOString(),
        createdBy: profile.uid,
        content: form.content,
        userIdentifier: profile.displayName,
        questionKey,
      };
      this.af.database.list('/comments').push(comment);
    });
  }
}
