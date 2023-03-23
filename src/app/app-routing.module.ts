import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./employee/employee.component";
import {CompanyComponent} from "./company/company.component";

const routes: Routes = [
  {path:'employee',component:EmployeeComponent},
  {path:'company',component:CompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
