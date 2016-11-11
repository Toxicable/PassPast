import { Component } from '@angular/core'
import { OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidationService} from "../../core/services/form-validation.service";
import {AccountService} from '../../core/auth/account.service';
import {AlertService} from '../../core/services/alert.service';
import {ExternalAuthService} from '../../core/auth/external-auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit{
    constructor(private formBuilder: FormBuilder,
                private account: AccountService,
                private formValidator: FormValidationService,
                private alert: AlertService,
                private externalAuth: ExternalAuthService
    ) { }

    loginForm: FormGroup;
    errors: string[];

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required, this.formValidator.emailValidator]],
            password: ['', [Validators.required, this.formValidator.passwordValidator]],
        });
        this.externalAuth.init();
    }

    onSubmit(){
        this.account.login(this.loginForm.value)
            .subscribe(
                () => this.alert.sendSuccess("Successfully logged in"),
                (error: string[]) => {
                    this.alert.sendWarning("Failed to login");
                    this.alert.sendInfo(error[0], 7000);
                    console.log(error);
                }
            );
    }

    facebookAuthorize(){
        this.externalAuth.authorizeFacebook()
    }

    googleAuthorize(){
        this.externalAuth.authorizeGoogle()
    }

}