import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudyDepotService {

  constructor(private http: HttpClient) { }
  getAllDepots(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "OrgID":id
    }
    console.log(body,id)
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSite',body)
  }
  getDetails(id): Observable<any>{
    const body={
      "OrgID":id
    }
    console.log('stydy')
    return this.http.post(environment.webserviceUrl+'api/Study/GetStudySiteList',body)
  }
  addUpdateDepot(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSite',body)

  }
  addUpdateStatus(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSiteActivities',body)

  }
}
