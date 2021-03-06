import { RequestsComponent } from './requests/requests.compoent';
import { CurrentUsersComponent } from './current-users/current-users.component';
import { AddUserRoleComponent } from './roles/add-user-role.component';
import { RolesComponent } from './roles/roles.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { adminRouting } from './admin.routing';
import { MdDialogModule, MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    AdminComponent,
    RolesComponent,
    AddUserRoleComponent,
    CurrentUsersComponent,
    RequestsComponent,
  ],
  entryComponents: [
    AddUserRoleComponent,
  ],
  imports: [
    MdDialogModule.forRoot(),
    adminRouting,
    SharedModule,

  ]
})
export class AdminModule { }
