import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../core/profile/profile.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidationService} from "../core/services/form-validation.service";
import {AccountService} from '../core/auth/account.service';
import {AlertService} from '../core/services/alert.service';

@Component({
    selector: 'account',
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
    constructor(private profile: ProfileService,
                private formBuilder: FormBuilder,
                private formValidator: FormValidationService,
                private account: AccountService,
                private alert: AlertService
    ) { }



    

    resetPasswordForm: FormGroup;
    errors: string[];

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required, this.formValidator.passwordValidator]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, this.formValidator.passwordValidator]],
                confirmPassword: ['', [Validators.required, this.formValidator.passwordValidator]]
            }, {validator: this.formValidator.passwordComparisonValidator})
        });
    }

    submitChangePassword(){
        let password = Object.assign({}, this.resetPasswordForm.value, this.resetPasswordForm.controls["passwords"].value);
        delete password["passwords"];

        this.account.changePassword(password)
            .subscribe(
                () => this.alert.sendSuccess("Password successfully sent"),
                errors => {
                    this.alert.sendWarning(errors[0])
                    console.log(errors)
                }
            )
    }



}