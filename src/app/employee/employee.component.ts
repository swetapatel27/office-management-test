import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  roles: any;
  companies: any;
  employeeForm: any;
  isSubmitted = false;
  employees:any;
  errorMsg = "";
  rowIndex = -1;
  edit = false;

  selectedRole="Admin"

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private companyService: CompanyService) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      dept: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.employeeService.getRoles().subscribe((res) => {
      this.roles = res.msg;
    })
    this.companyService.getAllCompanies().subscribe((res) => {
      this.companies = res.msg;
    })
  this.employeeService.employeeRefresh.subscribe(() => {
      this.getAllEmployees();
    });
    this.getAllEmployees();
  }

  get formControls() {
    return this.employeeForm.controls;
  }

  private getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data.employees;
      console.log(this.employees);
    })
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.employeeForm.invalid) {
      return;
    } else {
      console.table(this.employeeForm.value);
      this.employeeService.addEmployee(this.employeeForm.value).subscribe((data: any) => {
        console.log("data add-->", data);
      });
    }
  }

   EnableEdit(index: any) {
    this.edit = true;
    this.rowIndex = index;
  }

  stopEditing() {
    this.edit = false;
    this.rowIndex = -1;
  }
 update(company: any) {
    this.employeeService.updateEmployee(company).subscribe((data: any) => {
        console.log("data add-->", data);
        this.errorMsg="";
      this.edit = false;
      this.rowIndex = -1;
      }, (error) => {
      console.log(error);
      this.errorMsg = error.error.message;
    });

  }

  delete(company: any) {
    this.employeeService.deleteEmployee(company).subscribe((data: any) => {
        console.log("data add-->", data);
      });
    this.edit = false;
    this.rowIndex = -1;
  }
}
