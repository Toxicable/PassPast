import { Observable } from 'rxjs/Observable';
import { CurrentUser } from './../models/current-user';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CurrentUsersService {
  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) { }

  onConnected(): void{
    this.auth.uid$.first().subscribe(uid => {
      const user: CurrentUser = {
        key: uid || null,
        connectedAt: new Date().toISOString(),
      }

      this.af.database.list('/current-users')
        .push(user).then(result => {
          result.onDisconnect().remove();
        });
    });
  }

  getUsers(): FirebaseListObservable<CurrentUser[]> {
    return this.af.database.list('/current-users');
  }
}
