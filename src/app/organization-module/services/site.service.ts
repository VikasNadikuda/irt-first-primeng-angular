import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }

  getAllSites(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "OrgID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageSite',body)
  }
  addUpdateSite(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageSite',body)
  }

}
