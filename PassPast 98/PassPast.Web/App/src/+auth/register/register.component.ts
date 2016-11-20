import {Component, OnInit} from '@angular/core'
import { FormGroup, Validators,    FormBuilder }    from '@angular/forms';
import {FormValidationService} from "../../core/services/form-validation.service";
import {AlertService} from "../../core/alert/alert.service";
import {Router} from "@angular/router";
import { AccountService } from '../../core/account/account.service';
import { ExternalAuthService } from '../../core/auth-token/external-auth.service';

@Component({
    selector: 'register',
    templateUrl: './register.template.html'
})
export class RegisterComponent  implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private account: AccountService,
                private alert: AlertService,
                private router: Router,
                private formValidator: FormValidationService,
                private externalAuth: ExternalAuthService
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
        this.externalAuth.init();
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

    facebookAuthorize(){
        this.externalAuth.register("Facebook")
            .subscribe( x => {
                this.alert.sendSuccess("Successfully registered");
                this.router.navigateByUrl("/auth/login");
            });
    }

    fuckinggoogleauth(){
        let y = this.externalAuth.register("Google")
            .subscribe( x => {
                this.alert.sendSuccess("Successfully registered");
                this.router.navigateByUrl("/auth/login");
            });
        
    }


}