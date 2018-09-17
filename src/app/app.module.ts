import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CompareRequiredValidatorDirective } from './shared/compare-required-validator.directive';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { EmployeeService } from './employees/employee.service';
import { FormsModule } from '@angular/forms';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';

const appRoute: Routes = [
  {path : 'list', component : ListEmployeesComponent,
  resolve: { employeeList: EmployeeListResolverService }},
  {path : 'edit/:id', component : CreateEmployeeComponent,
  canDeactivate: [CreateEmployeeCanDeactivateGuardService]},
  {path : 'employees/:id', component : EmployeeDetailsComponent,
  canActivate: [EmployeeDetailsGuardService]},
  {path : 'notfound', component : PageNotFoundComponent},
  {path : '' , redirectTo : '/list' , pathMatch : 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    CompareRequiredValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoute, { enableTracing: true }), FormsModule, NgbModule.forRoot()
    , BsDatepickerModule.forRoot()
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService,
    EmployeeListResolverService, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
