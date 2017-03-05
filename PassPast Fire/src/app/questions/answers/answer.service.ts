import { AuthService } from './../../core/auth.service';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Answer, Course, Vote } from '../../models';

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
    }).flatMap((answers: Answer[]) => {
      return this.auth.uid$.map(uid => {
        return answers.map(answer => {
          answer.voteSum = 0;
          answer.userVoteValue = 0;
          Object.keys(answer.votes || {})
            .forEach(voteKey => {
              const vote: Vote = answer.votes[voteKey];
              answer.userVoteValue = voteKey === uid ? vote.value : answer.userVoteValue;
              answer.voteSum += vote.value;
            });
          return answer;
        });
      });
    });
  }

  create(form: { content: string }, questionKey: string) {
    this.auth.profile$.subscribe(profile => {
      const answer: Answer = {
        createdAt: new Date().toISOString(),
        createdBy: profile.uid,
        contentOrIncriment: form.content,
        questionKey,
        votes: {},
        userIdentifier: profile.displayName
      };
      this.af.database.list('/answers').push(answer);
    });
  }
}
