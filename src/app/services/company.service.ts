import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient) {
  }


  get refreshNeeded(){
    return this._refreshNeeded$;
  }

  getAllCompanies():Observable<any>{
    return this.http.get<any>(environment.baseurl+"/get-companies");
  }

  addCompany(company: any):Observable<any> {
     return this.http
       .post<any>(environment.baseurl + "/add-company", company)
       .pipe(
       tap(()=>{
        this._refreshNeeded$.next();
       })
     )
  }

  updateCompany(company: any):Observable<any> {
     return this.http
       .patch<any>(environment.baseurl + "/update-company/"+company._id, company)
       .pipe(
       tap(()=>{
        this._refreshNeeded$.next();
       })
     )
  }

  deleteCompany(company: any):Observable<any> {
     return this.http
       .delete<any>(environment.baseurl + "/delete-company/"+company._id)
       .pipe(
       tap(()=>{
        this._refreshNeeded$.next();
       })
     )
  }

}
