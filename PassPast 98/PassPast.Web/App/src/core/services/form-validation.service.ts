import { FormGroup, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

Injectable();
export class FormValidationService {
    getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config: any = {
            'required'                : 'Required',
            'invalidCreditCard'       : 'Is invalid credit card number',
            'invalidEmailAddress'     : 'Invalid email address',
            'invalidPassword'         : 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength'               : `Minimum length ${validatorValue.requiredLength}`,
            'invalidCompare'          : 'Passwords must match',
            'invalidYearRange'        : 'Value must be in the range of 1950-3000'
        };

        return config[validatorName];
    }

    passwordComparisonValidator(group: FormGroup) {
        let password = group.controls['password'] as FormControl;
        let confirmPassword = group.controls['confirmPassword'] as FormControl;

        if (password.dirty && confirmPassword.dirty) {
            if (password.value === confirmPassword.value) {
                return null;
            }else {
                return { invalidCompare: true };
            }
        }else {
            return { invalidCompare: true };
        }
    }

    emailValidator(control: FormControl) {
        if (control.value.match(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)) {
            return null;
        } else {
            return { invalidEmailAddress: true };
        }
    }

    passwordValidator(control: FormControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { invalidPassword: true };
        }
    }

    yearRangeValidator(control: FormControl){
        let value = parseInt(control.value);
        if (value >= 1950 && value <= 3000){
            return null;
        } else {
            return { invalidYearRange: true }
        }
    }
}
