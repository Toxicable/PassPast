import { Observable } from 'rxjs/Observable';
import { Request, RequestType } from './../models';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestService {

  requests$: Observable<Request[]>;
  list$: FirebaseListObservable<Request[]>;

  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) {
    this.list$ = this.af.database.list('/requests');
  }

  create(form: any, type: RequestType) {
    this.get(form).flatMap((existingRequest: Request) => {
      return this.auth.uid$.first().map(uid => {
        if (existingRequest) {
          this.list$.update(existingRequest.$key, { requestedBy: [...existingRequest.requestedBy, uid] });
        } else {
          const request: Request = {
            data: form,
            type: type,
            requestedBy: [uid],
            createdAt: new Date().toISOString()
          };
          this.list$.push(request);
        }
      });
    })
      .subscribe();

  }

  checkExisting(form: any) {
    return this.auth.uid$.first().flatMap(uid => {
      return this.get(form).map(request => request && request.requestedBy.includes(uid));
    });
  }

  private get(data: any) {
    return this.list$.first().map((reqs: Request[]) => {
      return reqs.filter(req => Object.keys(data)
        .every(key => data[key] === req.data[key])
      );
    }).map(reqs => reqs.length === 1 ? reqs[0] : null);
  }
}
