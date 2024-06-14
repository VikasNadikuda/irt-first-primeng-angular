import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OrganisationsService {

  constructor(private http: HttpClient) { }
  
  public getOrganisations(): Observable<any>{
    const body=  {
      "Type": "GETALL"
         
   }
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageOrg',body)
  }
    public getCountry(): Observable<any>{
      const body={
        "CId": null,
        "Type":"COUNTRY"

     }
    return this.http.post(environment.webserviceUrl+'api/Organization/GetCountryStateCity',body)
  }
  public getMasterRoles(): Observable<any>{
    const body={
      "CId": null,
      "Type":"MASTER ROLE"
         
   }
  return this.http.post(environment.webserviceUrl+'api/Organization/GetCountryStateCity',body)
}
public getOrgRoles(): Observable<any>{
  const body={
    "CId": null,
    "Type":"ORGANIZATION ROLE"
       
 }
return this.http.post(environment.webserviceUrl+'api/Organization/GetCountryStateCity',body)
}
    public getState(form: any): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Organization/GetCountryStateCity',form)
  }
    public getCity(form: any): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Organization/GetCountryStateCity',form)
  }
    public saveOrganisations(form: any): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageOrg',form)
  }
  public getOrgans(): Observable<any>{
    const body={

    }
    return this.http.post(environment.webserviceUrl+'api/Master/GetOrganizations',body)
  }
}
