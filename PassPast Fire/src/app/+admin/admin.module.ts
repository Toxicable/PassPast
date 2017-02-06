import { AddUserRoleComponent } from './roles/add-user-role.component';
import { AddRoleComponent } from './roles/add-role.component';
import { RolesComponent } from './roles/roles.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { adminRouting } from './admin.routing';

@NgModule({
  declarations: [
    AdminComponent,
    RolesComponent,
    AddRoleComponent,
    AddUserRoleComponent,
  ],
  // entryComponents: [
  //   AddRoleComponent,
  // ],
  imports: [
    adminRouting,
    SharedModule,

  ]
})
export class AdminModule { }
