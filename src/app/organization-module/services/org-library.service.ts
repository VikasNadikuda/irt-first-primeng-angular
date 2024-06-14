import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class OrgLibraryService {

  constructor(private http: HttpClient) { }
  public getCountries(id): Observable<any>{
    const body=   {
      "Type": "GETALLCOUNTRY",
      "Lib_Name": "COUNTRY",
      "ORGID":id
       
    }
  return this.http.post(environment.webserviceUrl+'api/Organization/ManageOrgLibrary',body)
  }
  public getStates(id): Observable<any>{
    const body=   {
      "Type": "GETALLSTATE",
      "Lib_Name": "STATE",
      "ORGID":id
       
    }
  return this.http.post(environment.webserviceUrl+'api/Organization/ManageOrgLibrary',body)
  }
  public getCities(id): Observable<any>{
    const body=   {
      "Type": "GETALLCITY",
      "Lib_Name": "CITY",
      "ORGID":id
       
    }
  return this.http.post(environment.webserviceUrl+'api/Organization/ManageOrgLibrary',body)
  }
  public getLibraries(id): Observable<any>{
    const body=   {
      "Type": "GETALL",
      "ORGID":id
    }
  return this.http.post(environment.webserviceUrl+'api/Organization/ManageOrgLibrary',body)
  }
  public addUpdateLibrary(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageOrgLibrary',body)
  }
  public uploadFile(body,uid,lname,oid): Observable<any>{
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    return this.http.post(environment.webserviceUrl+'api/Organization/ImportLibrary',body,{headers:headers,params:{UID:uid,Lib_Name:lname,ORGID:oid}})
  }
  public getCountry(id): Observable<any>{
    const body={
      "CId": null,
      "Type":"COUNTRY",
      "ORGID":id
         
   }
  return this.http.post(environment.webserviceUrl+'api/Organization/GetOrgCountryStateCity',body)
}
public getState(form: any): Observable<any>{
  return this.http.post(environment.webserviceUrl+'api/Organization/GetOrgCountryStateCity',form)
}
  public getCity(form: any): Observable<any>{
  return this.http.post(environment.webserviceUrl+'api/Organization/GetOrgCountryStateCity',form)
}
}
