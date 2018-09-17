import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive ({
  selector: '[appCompareValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CompareRequiredValidatorDirective,
    multi: true
  }]
})

export class CompareRequiredValidatorDirective implements Validator {
  @Input() appCompareValidator: string;
  validate (passwordGroup: AbstractControl): {[key: string]: any} | null {
    const passwordField = passwordGroup.get('password');
    const confirmPasswordField = passwordGroup.get('confirmPassword');
    if (passwordField && confirmPasswordField && passwordField.value !==
      confirmPasswordField.value) {
      return {'notEqual': true};
    }
    return null;
  }
}
