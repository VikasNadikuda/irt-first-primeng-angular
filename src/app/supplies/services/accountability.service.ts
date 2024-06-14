import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AccountabilityService {

  constructor(private http: HttpClient) { }


  public getAccount(id): Observable<any>{
    const body={
      "Action":"GETALL",
      "StudyID":id
    
  }
    return this.http.post(environment.webserviceUrl+'api/Supplies/ManageSuppliesAccSettings',body)
  }


  public addUpdateAcc(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Supplies/ManageSuppliesAccSettings',body)
  }

  
}
