import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CohartService {

  constructor(private http: HttpClient) { }
  
  getAllCohort(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageCohort',body)
  }
  addUpdateCohort(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageCohort',body)
  }
  getList(id): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GetCohort',{params:{StudyID:id}})
  }

}
