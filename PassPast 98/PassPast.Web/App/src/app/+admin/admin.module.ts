import { adminRouting } from './admin.routes';
import { NgModule }          from '@angular/core';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { RoleService } from './roles.service';
import { UserService } from './users/user.service';
import { UserListComponent } from './users/user-list.component';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        adminRouting,
        SharedModule
    ],
    declarations: [
        AdminComponent,
        UsersComponent,
        UserListComponent
    ],
    providers: [
        UserService,
        RoleService
    ],
})
export class AdminModule { }
