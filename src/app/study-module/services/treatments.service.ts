import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TreatmentsService {

  constructor(private http: HttpClient) { }

  getAllTreatments(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":id
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageTreatment',body)
  }
  addUpdateTreatment(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageTreatment',body)
  }
}