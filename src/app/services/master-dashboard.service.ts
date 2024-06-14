import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class MasterDashboardService {

  constructor(private http: HttpClient) { }

  getDetails(): Observable<any>{ 
    const body={
      "Action": "MASTER",
      "OrgID": null
     
    }
    return this.http.post(environment.webserviceUrl+'api/Master/GetDashBoard',body)
  }
}
