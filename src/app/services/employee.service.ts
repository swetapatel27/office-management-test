import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _employeeRefresh$ = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get employeeRefresh() {
    return this._employeeRefresh$;
  }

  getRoles() {
    return this.http.get<any>(environment.baseurl + "/get-roles");
  }

   getAllEmployees():Observable<any>{
    return this.http.get<any>(environment.baseurl+"/get-employees");
  }

  addEmployee(employee: any): Observable<any> {
    return this.http
      .post<any>(environment.baseurl + "/add-employee", employee)
      .pipe(
        tap(() => {
          this._employeeRefresh$.next();
        })
      )
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http
      .patch<any>(environment.baseurl + "/update-employee/"+employee._id, employee)
      .pipe(
        tap(() => {
          this._employeeRefresh$.next();
        })
      )
  }
   deleteEmployee(employee: any): Observable<any> {
    return this.http
      .delete<any>(environment.baseurl + "/delete-employee/"+employee._id)
      .pipe(
        tap(() => {
          this._employeeRefresh$.next();
        })
      )
  }

}


