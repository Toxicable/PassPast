import { FormValidators } from 'angular-validators';
import { AlertService } from './../../core/alert/alert.service';
import { RolesService } from './../../core/roles.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'add-role',
  templateUrl: 'add-role.component.html'
})
export class AddRoleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private roles: RolesService,
    private alert: AlertService,
  ) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [FormValidators.required]],
    });
  }

  onSubmit() {
    this.roles.create(this.form.value);
    this.form.reset();
  } 
}
