import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient) { }
  
  
  getAllDepots(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "OrgID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageSite',body)
  }
  getDetails(id): Observable<any>{
    const body={
      "ORGANIZATIONID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Organization/GetSiteList',body)
  }
  addUpdateDepot(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageSite',body)
  }

}
