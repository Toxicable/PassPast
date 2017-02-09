import { AuthService } from './../../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { Vote, Answer, VoteType } from './../../models';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
@Injectable()
export class VoteService {
  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) { }

  create(value: VoteType, answerKey: string, isMcq = false) {
    this.auth.uid$.first().subscribe(uid => {
      const vote: Vote = {
        value: value,
        updatedAt: new Date().toISOString(),
      };
      const existingVote = this.af.database.object(`/answers/${answerKey}/votes/${uid}`);

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
      };
      if (!isMcq) {
        sendVote();
      } else if (isMcq) {
        this.af.database.object(`/answers/${answerKey}`)
          .flatMap((answer: Answer) => {
            return this.af.database.list('/answers', {
              query: {
                orderByChild: 'questionKey',
                equalTo: answer.questionKey
              }
            });
          })
          .first().subscribe((answers: Answer[]) => {
            answers.filter(a => a.$key !== answerKey)
              .forEach(answer => {
                if (answer.votes && answer.votes[uid] != null) {
                  const answerObject = this.af.database.object(`/answers/${answer.$key}/votes/${uid}`);
                  answerObject.first().subscribe(res => {
                    answerObject.remove();
                  });
                }
              });
            sendVote();
          });
      }
    });
  }
}
