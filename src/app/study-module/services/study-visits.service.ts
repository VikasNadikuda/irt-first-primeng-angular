import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudyVisitsService {

  constructor(private http: HttpClient) { }
  public getVisits(orgId): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":orgId
   
  }
  return this.http.post(environment.webserviceUrl+'api/Study/ManageVisit',body)
  }
  public addUpdateKitType(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageVisit',body)
  }
  
  public getKitTypes(id,vid): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":id,
      "ID":vid
   
  }
  return this.http.post(environment.webserviceUrl+'api/Study/ManageVisitARMKitType',body)
  }
  public addUpdateKitTypeConfiguration(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageVisitARMKitType',body)
  }
  public getKitTypeList(id): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GETKNTLIST',{params:{StudyID:id}})
  }
}
