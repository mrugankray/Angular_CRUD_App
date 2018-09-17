import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { EmployeeService } from './employee.service';
import { IEmployee } from '../Models/Iemployee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit/*, OnChanges*/ {
  @Input() employee: IEmployee;
  @Input() searchText: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete: boolean = false;
  employeeSelectedOptional: number;
  constructor(private _acivatedRoute: ActivatedRoute, private _router: Router,
  private _employeeService: EmployeeService) { }
  @Output() notify: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();
  ngOnInit() {
    this.employeeSelectedOptional = +this._acivatedRoute.snapshot.paramMap.get('id');
  }
  handleClick(): void {
    this.notify.emit(this.employee);
  }
  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: {'searchText': this.searchText}
    });
  }
  editEmployee () {
    this._router.navigate(['/edit', this.employee.id]);
  }
  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }
  /*
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const previousValue = <IEmployee>changes.employee.previousValue;
    const currentValue = <IEmployee>changes.employee.currentValue;
    console.log(`previous: ${previousValue ? previousValue.name : 'NULL'}`);
    console.log(`current: ${currentValue.name}`);
  }
  */
}
