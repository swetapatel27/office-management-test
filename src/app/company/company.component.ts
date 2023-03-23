import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyForm: any;
  isSubmitted = false;
  rowIndex = -1;
  edit = false;

  companyList: any[] = [];
  errorMsg = "";

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.companyService.refreshNeeded.subscribe(() => {
      this.getAllcompanies();
    });
    this.getAllcompanies();
    console.log("companylist-->", this.companyList);
  }

  private getAllcompanies() {
    this.companyService.getAllCompanies().subscribe((data: any) => {
      this.companyList = data.msg;
    })
  }

  get formControls() {
    return this.companyForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.companyForm.invalid) {
      return;
    } else {
      this.companyService.addCompany(this.companyForm.value).subscribe((data: any) => {
        console.log("data add-->", data);
      });
    }
  }

  EnableEdit(index: any) {
    // company.edit = true;
    this.edit = true;
    this.rowIndex = index;
  }

  stopEditing() {
    this.edit = false;
    this.rowIndex = -1;
    // company.edit = false;
  }


  update(company: any) {
    this.companyService.updateCompany(company).subscribe((data: any) => {
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
    this.companyService.deleteCompany(company).subscribe((data: any) => {
      console.log("data add-->", data);
    });
    this.edit = false;
    this.rowIndex = -1;
  }

}
