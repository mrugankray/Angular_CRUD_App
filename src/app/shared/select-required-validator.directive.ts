import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS, /* NG_VALIDATORS is a bitToken it contains a list of all valiators
    including angular validators , it's also the place where we register our validator*/
    useExisting: SelectRequiredValidatorDirective,
    multi: true// to signal angular to add SelectRequiredValidatorDirective class to NG_VALIDATORS e use multi
  }]
})

export class SelectRequiredValidatorDirective implements Validator {
  @Input() appSelectValidator: string;
  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value === 'selected' ? {'defaultSelected': true} : null;
  }
  // validate is a method of Validator,
  // AbstractControl is a pipe used for the parameter passed in the validate method
  // AbstractControl is the parent of form-control and form group class
  // defaultValue is added to the collection of errors of select class
}
