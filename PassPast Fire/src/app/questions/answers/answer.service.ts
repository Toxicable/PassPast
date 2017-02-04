import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http } from '@angular/http';
import { Answer, Course } from '../../models';

@Injectable()
export class AnswerService {
  constructor(
    private af: AngularFire,
  ) { }

  getAnswers(questionKey: string) {
    return this.af.database.list('/answers', {
      query: {
        orderByChild: 'questionKey',
        equalTo: questionKey
      }
    })
  }

  create(form: {content: string}, questionKey: string) {
    const answer: Answer = {
      createdAt: new Date().toISOString(),
      createdBy: this.af.auth.getAuth().uid,
      contentOrIncriment: form.content,
      questionKey,
      voteValue: 0,
      votesSum: 0
    }
    this.af.database.list('/answers').push(answer);
  }
}
