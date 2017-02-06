import { FormValidators } from 'angular-validators';
import { AlertService } from './../../core/alert/alert.service';
import { RolesService } from './../../core/roles.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'add-user-role',
  templateUrl: 'add-user-role.component.html'
})
export class AddUserRoleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private roles: RolesService,
    private alert: AlertService,
  ) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      roleName: ['', [FormValidators.required]],
      userKey: ['', [FormValidators.required]],
    });
  }

  onSubmit() {
    this.roles.addToRole(this.form.value);
    this.form.reset();
  }
}
