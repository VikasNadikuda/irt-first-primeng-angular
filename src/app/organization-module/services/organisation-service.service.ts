import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class OrganisationServiceService {

  constructor(private http: HttpClient) { }
   
  public getDashDetails(id): Observable<any>{
    const body={
      "ORGANIZATIONID" :id
    
  }
    return this.http.post(environment.webserviceUrl+'api/Organization/GetOrgDashboard',body)
  }
}
