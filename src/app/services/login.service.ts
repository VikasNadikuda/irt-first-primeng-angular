import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginForm(form: any): Observable<any>{
    return this.http.post(environment.webserviceUrl+'Authentication',form)
  }
  setPassword(form: any): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/LogIn/UpdatePassword',form)
  }
  sendPassword(value:any):Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/LogIn/GetpasswordByID',value)

  }
}
