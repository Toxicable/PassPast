import { Observable } from 'rxjs/Observable';
import { Vote, Answer } from './../../models';
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

  create(value: 1 | -1, type: 'comment' | 'answer', key: string, isMcq = false) {
    const userKey = this.af.auth.getAuth().uid;
    const vote: Vote = {
      value: value,
      updatedAt: new Date().toISOString(),
    };
    const existingVote = this.af.database.object(`/votes/${type}/${key}/${userKey}`);

    const sendVote = () => {
      existingVote.first()
        .subscribe(v => {
          if (!v.$exists()) {
            existingVote.set(vote);
          } else if (v.value !== vote.value) {
            existingVote.update(vote);
          } else if (v.value === vote.value) {
            existingVote.remove();
          }
        });
    }
    if (!isMcq) {
      sendVote();
    } else if (isMcq) {
      this.af.database.object(`/answers/${key}`)
        .flatMap((answer: Answer) => {
          return this.af.database.list('/answers', {
            query: {
              orderByChild: 'questionKey',
              equalTo: answer.questionKey
            }
          });
        })
        .first().subscribe((answers: Answer[]) => {
          answers.filter(a => a.$key !== key)
            .forEach(answer => {
              //delete it with a call without retrieveing it
              const answerObject = this.af.database.object(`/votes/answer/${answer.$key}/${userKey}`)
              answerObject.first().subscribe(res => {
                if (res.$exists()) {
                  answerObject.remove();
                }
              });
            });

          sendVote();
        });
    }


  }

}
