import { CurrentUser } from './../../models/current-user';
import { CurrentUsersService } from './../../core/current-users.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'current-users',
  templateUrl: 'current-users.component.html'
})
export class CurrentUsersComponent implements OnInit {
  users$: Observable<CurrentUser[]>;

  constructor(
    private currentUsers: CurrentUsersService,
  ) { }
  ngOnInit() {
    this.users$ = this.currentUsers.getUsers();
  }
}
