import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class InventorySetService {

  constructor(private http: HttpClient) { }

  public uploadFile(body,uid,orgid,type,fname): Observable<any>{
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    console.log(body,uid,orgid,type,fname)
    return this.http.post(environment.webserviceUrl+'api/Supplies/ImportInventoryRelease',body,{headers:headers,params:{userID:uid,StudyID:orgid,kitType:type,fileName:fname}})
  }


}

