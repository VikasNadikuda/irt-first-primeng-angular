import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudyRoleService {

  constructor(private http: HttpClient) { }
  globalStudy
  studies
  
  setStudy(studies){
    if(studies?.length!=0){
      this.globalStudy=studies[0]
      localStorage.setItem('r_id',this.globalStudy?.ROLE_NAME)
      console.log('service',studies)
    }
    console.log(studies)
    this.studies=studies
  }
  studyChanged(obj){
    this.globalStudy=obj
    localStorage.removeItem('r_id')
    localStorage.setItem('r_id',this.globalStudy?.ROLE_NAME)
    

  }
  public addUpdateRoles(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Study/ManageStudyRole',body)
  }
  public getAllRoles(): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GetRoles ')
  } 
  public getAllRolesForStudy(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":id
   
  }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageStudyRole',body)
  }

}
