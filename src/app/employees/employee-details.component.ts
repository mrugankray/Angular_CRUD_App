import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './employee.service';
import { IEmployee } from '../Models/Iemployee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: IEmployee;
  private _id: number;
  constructor(private _activatedRoute: ActivatedRoute,
  private _employeeService: EmployeeService,
  private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this.employee = this._employeeService.getEmployee(this._id);
    });
  }
  nxtEmployee(): void {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }
    this._router.navigate(['/employees', this._id], {
      queryParamsHandling: 'preserve'
    });
  }
}
