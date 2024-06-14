import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ManageStudyService {

  constructor(private http: HttpClient) { }
  public addUpdateStudy(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageStudy',body)
  }
  public getStudies(id): Observable<any>{
    const body={
      'UID':id
    }
    return this.http.post(environment.webserviceUrl+'api/Organization/GetStudyList',body)
  }
}
