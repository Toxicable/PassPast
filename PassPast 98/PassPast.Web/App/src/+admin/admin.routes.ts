import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {RolesComponent} from "./roles/roles.component";
import {UsersComponent} from "./users/users.component";
import {SuperAdminAuthGuard} from "../core/guards/super-admin-auth-guard.service";
import {UserListComponent} from './users/user-list.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [SuperAdminAuthGuard],
        children: [
            {
                path: '',
                component: RolesComponent
            },
            {
                path: 'roles',
                component: RolesComponent
            },
            {
                path: 'users',
                component: UserListComponent
            }
        ]
    }
];



export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);