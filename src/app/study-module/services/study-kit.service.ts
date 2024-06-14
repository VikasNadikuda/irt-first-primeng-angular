import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudyKitService {

  constructor(private http: HttpClient) { }
  
  public getKitList(orgId): Observable<any>{
    const body={
      "Action":"GETALL",
      "OrgID":orgId
   
  }
  return this.http.post(environment.webserviceUrl+'api/Study/ManageKitType',body)
  }
  public addUpdateKitType(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageKitType',body)
  }
}
