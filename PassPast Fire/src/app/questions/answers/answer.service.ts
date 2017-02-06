import { AuthService } from './../../core/auth.service';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http } from '@angular/http';
import { Answer, Course } from '../../models';

@Injectable()
export class AnswerService {
  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) { }

  getAnswers(questionKey: string) {
    return this.af.database.list('/answers', {
      query: {
        orderByChild: 'questionKey',
        equalTo: questionKey
      }
    });
  }

  create(form: { content: string }, questionKey: string) {
    this.auth.uid$.subscribe(uid => {
      const answer: Answer = {
        createdAt: new Date().toISOString(),
        createdBy: uid,
        contentOrIncriment: form.content,
        questionKey,
        voteValue: 0,
        votesSum: 0,
      };
      this.af.database.list('/answers').push(answer);
    });
  }
}
