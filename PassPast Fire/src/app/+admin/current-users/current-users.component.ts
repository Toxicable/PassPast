import { CurrentUser } from './../../models/current-user';
import { CurrentUsersService } from './../../core/current-users.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/observable/interval';

@Component({
  selector: 'current-users',
  templateUrl: 'current-users.component.html'
})
export class CurrentUsersComponent implements OnInit {
  users$: Observable<CurrentUser[]>;
  now$: Observable<string>;

  constructor(
    private currentUsers: CurrentUsersService,
  ) { }

  ngOnInit() {
    this.users$ = Observable.combineLatest(
      this.currentUsers.getUsers(),
      Observable.interval(500),
      (users, interval) => users.map(user => {
        const now = new Date().getTime();
        const then = new Date(user.connectedAt).getTime();
        const duration = new Date(now - then);
        duration.setHours(duration.getHours() - 13);
        user.connectedFor = new Date(duration).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
        return user;
      })
    );
  }
}
