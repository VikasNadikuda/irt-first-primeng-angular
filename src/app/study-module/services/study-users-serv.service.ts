import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudyUsersServService {

  constructor(private http: HttpClient) { }
  getAllUsers(sid,oid): Observable<any>{
    const body={
      "Action":"GETALL",
      "STUDY_ID":sid,
      "ORG_ID":oid
    }
    return this.http.post(environment.webserviceUrl+'api/Study/ManageAssignUser',body)
  }
  getUserRequiredDetails(sid,orgId): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GetManagerUserList',{params:{StudyID:sid,OrgID:orgId}})
  }
  addUpdateUser(body): Observable<any>{
    console.log(body)
    return this.http.post(environment.webserviceUrl+'api/Study/ManageAssignUser',body)
  }
}


// {odj1

// user1
// roleid
// studyid
// blided

// user1
// studyid
// siteid}


