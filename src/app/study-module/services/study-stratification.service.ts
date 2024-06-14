import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudyStratificationService {

  constructor(private http: HttpClient) { }
  getAllCohort(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":id
    }
    return this.http.get(environment.webserviceUrl+'api/Study/GetCohort',{params:{StudyID:id}})
  }
  getAllStrata(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/GetStrata',body)
  }
  addUpdateStrata(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageStrata',body)
  }

}
