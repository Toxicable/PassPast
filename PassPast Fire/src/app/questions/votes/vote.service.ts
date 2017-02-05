import { Vote } from './../../models';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
@Injectable()
export class VoteService {
  constructor(
    private af: AngularFire,
  ) { }

  getVote(type: 'comment' | 'answer', key: string) {
    return this.af.database.object(`/votes/${type}/${key}`)
      .map((votes: { [key: string]: Vote }) => {
        const userKey = this.af.auth.getAuth().uid;

        return {
          userValue: votes[userKey] ? votes[userKey].value : null,
          sum: Object.keys(votes)
            .filter(voteKey => voteKey !== '$key' && voteKey !== '$exists' && voteKey !== '$value')
            .map(voteKey => votes[voteKey])
            .reduce((a, b) => a + b.value, 0)
        };
      });
  }

  create(value: 1 | -1, type: 'comment' | 'answer', key: string) {
    const userKey = this.af.auth.getAuth().uid;
    const vote: Vote = {
      value: value,
      updatedAt: new Date().toISOString(),
    };
    const object = this.af.database.object(`/votes/${type}/${key}/${userKey}`);
    if (type === 'comment') {
      object.first()
        .subscribe(v => {
          if (!v.$exists()) {
            object.set(vote);
          } else if (v.value !== vote.value) {
            object.update(vote);
          } else if (v.value === vote.value) {
            object.remove();
          }
        });
    } else if (type === 'answer') {






    }
  }

}
