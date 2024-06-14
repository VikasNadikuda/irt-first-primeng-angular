import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }
  public uploadFile(body,uid,orgid,type,fname): Observable<any>{
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    return this.http.post(environment.webserviceUrl+'api/Master/Import',body,{headers:headers,params:{userID:uid,orgId:orgid,kitType:type,fileName:fname}})
  }
}
