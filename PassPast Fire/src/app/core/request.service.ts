import { Request, RequestType } from './../models';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestService {

  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) { }

  create(form: any, type: RequestType) {
    this.auth.uid$.first().subscribe(uid => {
      const item = {
        data: form,
        type: type,
        createdBy: uid,
        createdAt: new Date().toISOString()
      }
      this.af.database.list('/requests').push(item);
    })
  }
}
