import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(id):Observable<any>{
    const body=   {
      "Type": "GETALL",
      "ORGANIZATIONID": id
   }
    return this.http.post(environment.webserviceUrl+'api/Master/ManageUser',body)

  }
  public saveEditUser(form):Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Master/ManageUser',form)
  }
  public getTimezone():Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Master/GetTimeZone')
  }
}
