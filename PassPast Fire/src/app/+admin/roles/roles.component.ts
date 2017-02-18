import { AddUserRoleComponent } from './add-user-role.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { RolesService } from './../../core/roles.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'roles',
  templateUrl: 'roles.component.html'
})
export class RolesComponent {

  roles$: Observable<any>;
  private dialogRef: MdDialogRef<AddUserRoleComponent>;

  constructor(
    private roles: RolesService,
    private dialog: MdDialog,
  ) {
    this.roles.isInRole('Admina')
      .subscribe(a => console.log(a));
  }

  ngOnInit() {
    this.roles$ = this.roles.getRoles();
  }

  removeRole(role: string, userKey: string) {
    this.roles.removeFromRole(role, userKey);
  }

  openDialog() {
    this.dialogRef = this.dialog.open(AddUserRoleComponent, {
      disableClose: false
    });
  }
}


