import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor(private http: HttpClient) { }
  public uploadFile(body,uid,lname,fname): Observable<any>{
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    return this.http.post(environment.webserviceUrl+'api/Study/ImportRand',body,{headers:headers,params:{userID:uid,StudyID:lname,FileName:fname,Type:'Randomization'}})
  }
  public getRandomLists(id): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GetStudyFileList',{params:{StudyID:id,Type:'Randomization'}})
  }
  public getLists(sid,id): Observable<any>{
    return this.http.get(environment.webserviceUrl+'api/Study/GetStudyRandDataList',{params:{StudyID:sid,BID:id}})
  }
}
