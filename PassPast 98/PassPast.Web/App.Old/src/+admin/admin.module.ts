import {adminRouting} from "./admin.routes";
import { NgModule }          from '@angular/core';
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";
import {SuperAdminAuthGuard} from "../core/guards/super-admin-auth-guard.service";
import {SharedModule} from "../shared/shared.module";
import {RoleService} from "./roles.service";
import {UserService} from "./users/user.service";
import {UserListComponent} from './users/user-list.component';

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
        SuperAdminAuthGuard,
        UserService,
        RoleService
    ],
})
export class AdminModule { }