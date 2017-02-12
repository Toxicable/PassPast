import { RequestsComponent } from './requests/requests.compoent';
import { CurrentUsersComponent } from './current-users/current-users.component';
import { RolesComponent } from './roles/roles.component';
import { AdminComponent } from './admin.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
         {
            path: 'roles',
            component: RolesComponent,
         },
         {
           path: 'current-users',
           component: CurrentUsersComponent,
         },
         {
           path: 'requests',
           component: RequestsComponent,
         }
        ]
    },
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);
