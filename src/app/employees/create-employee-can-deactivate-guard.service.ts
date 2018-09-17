import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent>{
    canDeactivate(component: CreateEmployeeComponent): boolean {
      if (component.createEmployeeForm.dirty) {
        console.log(component.createEmployeeForm);
        return confirm('Are you sure you want to discard the changes');
      }
      return true;
    }
}
