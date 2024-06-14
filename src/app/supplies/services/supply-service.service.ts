import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class SupplyServiceService {

  constructor(private http: HttpClient) { }

  getSequence(id): Observable<any>{
    const body={
      "StudyID":id,
      "Action":"GETALL",
    }
    // console.log('stydy')
    return this.http.post(environment.webserviceUrl+'api/Supplies/ManageSuppliesInfo',body)
  }
  addUpdateSequence(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Supplies/ManageSuppliesInfo',body)
  }
}
