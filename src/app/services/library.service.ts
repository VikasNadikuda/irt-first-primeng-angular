import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }
  public getCountries(): Observable<any>{
    const body=   {
      "Type": "GETALLCOUNTRY",
      "Lib_Name": "COUNTRY"
       
    }
  return this.http.post(environment.webserviceUrl+'api/Master/ManageLibrary',body)
  }
  public getStates(): Observable<any>{
    const body=   {
      "Type": "GETALLSTATE",
      "Lib_Name": "STATE"
       
    }
  return this.http.post(environment.webserviceUrl+'api/Master/ManageLibrary',body)
  }
  public getCities(): Observable<any>{
    const body=   {
      "Type": "GETALLCITY",
      "Lib_Name": "CITY"
       
    }
  return this.http.post(environment.webserviceUrl+'api/Master/ManageLibrary',body)
  }
  public getLibraries(): Observable<any>{
    const body=   {
      "Type": "GETALL",
    }
  return this.http.post(environment.webserviceUrl+'api/Master/ManageLibrary',body)
  }
  public addUpdateLibrary(body): Observable<any>{
    return this.http.post(environment.webserviceUrl+'api/Master/ManageLibrary',body)
  }
  public uploadFile(body,uid,lname): Observable<any>{
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    return this.http.post(environment.webserviceUrl+'api/Master/ImportLibrary',body,{headers:headers,params:{UID:uid,Lib_Name:lname}})
  }

}
