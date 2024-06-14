import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class SettKitListService {

constructor(private http: HttpClient) { }
  public getKitTypes(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "OrgID":id
    
  }
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageKitType',body)
  }
  public addUpdatekIt(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Organization/ManageKitType',body)
  }
  getKitLists(id,type): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GetStudyFileList',{params:{StudyID:id,Type:type}})
  }
  getKitDetails(orgid,kit_id): Observable<any>{
    const body={
      "Action":"GETBYID",
      "OrgID":orgid,
      "ID":kit_id
    }
    return this.http.post(environment.webserviceUrl+'api/Organization/GetKitList',body)
  }}
