import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {UserService} from './user.service';
import {RoleService} from '../roles.service';
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
    constructor(private userService: UserService,
                private roleService: RoleService,
                private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.users = this.store.select(state => state.users)

        this.getUsers();
    }
    users : Observable<User[]>;

    getUsers(){
        this.userService.getUsers()
            .subscribe()
    }

    removeFromRole(userId: string, roleId: string){
        this.roleService.removeFromRole(userId, roleId)
            .subscribe( )
    }

}