import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SubjectSettingsService {

  constructor(private http: HttpClient) { }

  //subject Data points
  getAllSubjectPoints(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/GetSubjectEdit',body)
  }
  addUpdateSubject(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSubjectEditPoints',body)
  }
  getAllScreening(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageScreeningConfig',body)
  }
  addUpdateScreening(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageScreeningConfig',body)
  }
  getAllVisits(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSubvisitconfig',body)
  }
  addUpdateVisit(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSubvisitconfig',body)
  }
  public getVisitList(orgId): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":orgId
   
  }
  return this.http.post(environment.webserviceUrl+'api/Study/ManageVisit',body)
  }
  getAllSubGroup(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSubGroupSettings',body)
  }
  addUpdateSubGroup(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSubGroupSettings',body)
  }
  getSubGroupDetails(id): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GetDDSubGroup',{params:{StudyID:id}})
  }


  getAllDisc(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSubDiscSettings',body)
  }
  addUpdateDisc(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageSubDiscSettings',body)
  }

  public getVisits(orgId): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":orgId
   
  }
  return this.http.post(environment.webserviceUrl+'api/Study/ManageVisit',body)
  }

  getAllreport(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageReportStatus',body)
  }
  addUpdatereport(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageReportStatus',body)
  }
 getLabels(): Observable<any>{
    const body={
      "Type":"GETALLCOUNTRY",
      "Lib_Name": "Reporting Status"
    }
    return this.http.post(environment.webserviceUrl+'api/Master/ManageLibrary',body)
  }
  getStatuses(id): Observable<any>{
    const body={
      'ID':id,
      "Action":"GETBYID",
    }
    return this.http.post(environment.webserviceUrl+'api/Study/UpdateStatus',body)
  }
  addUpdateStatus(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/UpdateStatus',body)
  }

}



