import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {IEmployee} from '../Models/Iemployee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: IEmployee[];
  filteredEmployee: IEmployee[];
  employeeToDisplay: IEmployee;
  valFromChild: IEmployee;
  private _searchText;
  private indexOfEmployeeSelected = 1;
  get searchText() {
    return this._searchText;
    // return;
  }
  set searchText(val: string) {
    this._searchText = val;
    this.filteredEmployee = this.filterEmployee(val);
  }
  filterEmployee(searchString: string) {
    return this.employees.filter(e => e.name.toLowerCase().
    indexOf(searchString.toLowerCase()) !== -1);
  }
  constructor(private _router: Router, private _acivatedRoute: ActivatedRoute) {
      this.employees = this._acivatedRoute.snapshot.data['employeeList'];
      if (this._acivatedRoute.snapshot.queryParamMap.has('searchText')) {
        this.searchText = this._acivatedRoute.snapshot.queryParamMap.get('searchText');
      } else {
        this.filteredEmployee = this.employees;
      }
     }
  ngOnInit(): void {
    /*this._employeeService.getEmployeeList().subscribe((val) => {
    this.employees = val;
    this.employeeToDisplay = this.employees[0];
    this.filteredEmployee = this.employees;
    });*/
  }
  nextEmployee(): void {
      if (this.indexOfEmployeeSelected <= 2) {
        this.employeeToDisplay = this.employees[this.indexOfEmployeeSelected];
        this.indexOfEmployeeSelected++;
        // console.log(this.employeeToDisplay);
      } else {
        this.employeeToDisplay = this.employees[0];
        this.indexOfEmployeeSelected = 1;
      }
  }
  valFromChildFunc(eventData: IEmployee) {
    this.valFromChild = eventData;
  }
  onDeleteNotification(id: number) {
    const i = this.filteredEmployee.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployee.splice(i, 1);
    }
  }
  onClickRoute(employeeId: number): void {
    this._router.navigate(['/employees', employeeId], {
      queryParams: {'searchText': this.searchText}
    });
  }
}
