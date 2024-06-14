import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {
  constructor(private http: HttpClient) { }
  public getTrails(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Master/GetAudit',body)
  }
}
