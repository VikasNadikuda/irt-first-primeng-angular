import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SettCountryService {

  constructor(private http: HttpClient) { }


  getIDs(id): Observable<any>{
    const body={
      "StudyID":id,
      "Action":"GETALL",
    }
    return this.http.post(environment.webserviceUrl+'api/Supplies/ManageCountryRelease',body)
  }
  addUpdateCountry(body): Observable<any>{
    console.log(body)
    return this.http.post(environment.webserviceUrl+'api/Supplies/ManageCountryRelease',body)
  }
}
