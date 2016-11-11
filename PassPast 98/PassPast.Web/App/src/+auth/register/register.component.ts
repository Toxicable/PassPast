import {Component, OnInit} from '@angular/core'
import { FormGroup, Validators,    FormBuilder }    from '@angular/forms';
import {FormValidationService} from "../../core/services/form-validation.service";
import {AlertService} from "../../core/services/alert.service";
import {Router} from "@angular/router";
import {AccountService} from '../../core/auth/account.service';

@Component({
    selector: 'register',
    templateUrl: './register.template.html'
})
export class RegisterComponent  implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private account: AccountService,
                private alert: AlertService,
                private router: Router,
                private formValidator: FormValidationService
    ) {   }
    registerForm: FormGroup;

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userName: ['', [Validators.required, this.formValidator.emailValidator]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, this.formValidator.passwordValidator]],
                confirmPassword: ['', [Validators.required, this.formValidator.passwordValidator]]
            }, {validator: this.formValidator.passwordComparisonValidator})
        });
    }


    onSubmit(){
        let data = Object.assign({}, this.registerForm.value, this.registerForm.value.passwords);
        delete data["passwords"];

        //TODO: find better way to do this :/

        this.account.register(data)
            .subscribe( x => {
                    this.alert.sendSuccess("Successfully registered");
                    this.router.navigateByUrl("/auth/login");
                }
            )
    };


}