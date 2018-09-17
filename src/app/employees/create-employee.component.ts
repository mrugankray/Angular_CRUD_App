import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { IDepartment } from './../Models/Idepartment.model';
import { IEmployee } from './../Models/Iemployee.model';
import { NgForm } from '@angular/forms';

// import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

// const now = new Date();
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  cardTitle: string;
  date_picker_config: Partial<BsDatepickerConfig>;
  contact_preference: string = 'email';
  image_path: string;
  show: boolean = false;
  default_date_for_date_picker: Date = new Date(1980, 0, 1);
  departments: IDepartment[] = [
    {id: 1, name : 'Action'},
    {id: 2, name : 'Comedy'},
    {id: 3, name : 'Horror'}
  ];
  // model: NgbDateStruct;
  model;
  employeeModel: IEmployee;
  constructor(private _router: Router, private _employeeService: EmployeeService,
  private _activatedRoute: ActivatedRoute) {
    this.date_picker_config = Object.assign({},
      {containerClass: 'theme-dark-blue',
       showWeekNumbers: false,
       minDate: new Date(1950, 0, 1),
       maxDate: new Date(2018, 11, 31),
       dateInputFormat: 'DD/MM/YY'
      });
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employeeModel = {
        id: null,
        name: null,
        email: null,
        gender: null,
        phone_number: null,
        contact_preference: null,
        date_of_birth: null,
        department: 'selected',
        is_active: null,
        img_path: null,
        password: null,
        confirmPassword: null
      };
      this.createEmployeeForm.reset();
      this.cardTitle = 'Create Employee';
    } else {
      this.cardTitle = 'Edit Employee';
      this.employeeModel = this._employeeService.getEmployee(id);
    }
  }

  saveEmployee(): void {
    const newEmployee = Object.assign({}, this.employeeModel);
    this.createEmployeeForm.reset();
    this._employeeService.save(newEmployee);
    this._router.navigate(['list']);
  }

  toggle_show(): void {
    this.show = !this.show;
  }
}
