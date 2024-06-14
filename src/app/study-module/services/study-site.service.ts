import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudySiteService {

  constructor(private http: HttpClient) { }
  getAllSites(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "OrgId":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSite',body)
  }
  getAllSiteConfig(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "Study_ID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSiteConfig',body)
  }
  getDetails(id): Observable<any>{
    const body={
      "Id":id
    }
    console.log('stydy')
    return this.http.post(environment.webserviceUrl+'api/Study/GetStudySiteList',body)
  }
  addUpdateSite(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSite',body)
  }
  addUpdateConfig(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSiteConfig',body)
  }
  getSiteConfig(sid,oid): Observable<any>{
    console.log(sid,oid)
    return this.http.get(environment.webserviceUrl+'api/Study/GetSiteConfig',{params:{StudyID:sid,ORGID:oid}})
  }
}
