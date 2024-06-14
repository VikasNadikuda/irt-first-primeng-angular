import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  getSettings(): Observable<any>{
    const body={
      "Action": "GETALL"
    }
    return this.http.post(environment.webserviceUrl+'api/Master/ManageSettings',body)
  }
  addUpdateSettings(body): Observable<any>{

    return this.http.post(environment.webserviceUrl+'api/Master/ManageSettings',body)
  }
}
