import { AddRoleComponent } from './add-role.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { RolesService } from './../../core/roles.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../core/auth.service';
import { Component} from '@angular/core';

@Component({
  selector: 'roles',
  templateUrl: 'roles.component.html'
})
export class RolesComponent {

  roles$: Observable<any>;
  private dialogRef: MdDialogRef<AddRoleComponent>;

  constructor(
    private roles: RolesService,
    private dialog: MdDialog,
  ) {
    this.roles.isInRole('Admina')
    .subscribe(a => console.log(a))

   }

  ngOnInit() {
    this.roles$ = this.roles.getRoles();
  }

  // openDialog() {
  //   this.dialogRef = this.dialog.open(AddRoleComponent, {
  //     disableClose: false
  //   });
}


