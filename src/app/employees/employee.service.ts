// import 'rxjs/add/observable/of'; // not working for angular 6

import { Observable, of } from 'rxjs';

import { IEmployee } from '../Models/Iemployee.model';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private listEmployees: IEmployee[] = [
    {
    id: 1,
    name: 'Dwayne',
    gender: 'Male',
    phone_number: 123,
    contact_preference: 'email',
    email: 'Duyen@gmail.com',
    date_of_birth: new Date('05/01/1960'),
    department: '1',
    is_active: true,
    img_path: '../../assets/images/san_andreas_dwayne_johnson_raymond_gaines_108009_3840x2160.jpg'
    },
    {
      id: 2,
      name: 'Arnold',
      gender: 'Male',
      phone_number: 456,
      contact_preference: 'phone_number',
      email: 'arnold@gmail.com',
      date_of_birth: new Date('10/09/1971'),
      department: '2',
      is_active: true,
      img_path: '../../assets/images/the_expendables_3_arnold_schwarzenegger_cigar_100178_3840x2160.jpg'
    },
    {
      id: 3,
      name: 'Chris',
      gender: 'Male',
      phone_number: 789,
      contact_preference: 'email',
      email: 'chris@gmail.com',
      date_of_birth: new Date('09/09/1960'),
      department: '3',
      is_active: true,
      img_path: '../../assets/images/thor_the_dark_world_2013_snow_walk_main_characters_93110_3840x2160.jpg'
    }
  ];

  getEmployeeList(): Observable<IEmployee[]> {
    // return this.listEmployees;
    return of(this.listEmployees);
  }
  save(employee: IEmployee) {
    if (employee.id === null) {
      const maxId = this.listEmployees.reduce(function(e1, e2) {
        return (e1.id > e2.id) ? e1 : e2;
      }).id;
      employee.id = maxId + 1;
      this.listEmployees.push(employee);
    } else {
      const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
      this.listEmployees[foundIndex] = employee;
    }
  }
  getEmployee(id: number): IEmployee {
    return this.listEmployees.find(e => e.id === id);
  }
  deleteEmployee(id: number) {
    const i = this.listEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.listEmployees.splice(i, 1);
    }
  }
  constructor() { }
}
