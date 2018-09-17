import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { EmployeeService } from './employee.service';
import { IEmployee } from './../Models/Iemployee.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeListResolverService implements Resolve<IEmployee[]> {
  constructor (private _employeeService: EmployeeService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee[]> {
    return this._employeeService.getEmployeeList();
  }
}
