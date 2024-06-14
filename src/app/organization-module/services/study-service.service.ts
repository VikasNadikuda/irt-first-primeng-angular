import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from '../../../environments/environment';
import {MenuSharedService} from '../../services/menu-shared.service'
import {StudyMenuConfig} from '../../_layout/settings/menu-settings.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuSettingsConfig } from "../../_layout/settings/menu-settings.config";  
import { MenuSettingsService } from "src/app/_layout/settings/menu-settings.service";

@Injectable({
  providedIn: 'root'
})
export class StudyServiceService {

  constructor(private http: HttpClient,private menuService:MenuSharedService,private spinner:NgxSpinnerService,private menu:MenuSettingsService) { }
  globalStudy
  globalStudyDetails
  studies
  perm
  globalPerm=[]
  setStudy(studies){
    if(studies?.length!=0){
      this.globalStudy=studies[0]
      console.log(this.globalStudy)
      localStorage.removeItem('r_id')
      localStorage.setItem('r_id',this.globalStudy?.ROLE)
      console.log('service',studies)
      this.studies=studies
      this.studyChanged(this.globalStudy)
    }
    console.log(studies)
    this.studies=studies
  }
  studyChanged(obj){
    this.globalStudy=obj
    console.log(obj)
    localStorage.removeItem('r_id')
    let role
    if(this.globalStudy?.ROLE==null){
      role=this.globalStudy.ROLE_NAME
      localStorage.setItem('r_id',this.globalStudy.ROLE_NAME)
      this.menu.ngOnit()

    }
    else{
      localStorage.setItem('r_id',this.globalStudy?.ROLE)
      this.menu.ngOnit()
      role=this.globalStudy?.ROLE

    }
    this.menuService.changeRole(role)
    // this.menu._init()
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject?.u_id)
    // this.menuService.permissions('110111001010010010100100101')
    console.log('study-ser')
    if(this.globalStudy?.PROTOCAL_ID!=null){
      this.studyDetails(uid,this.globalStudy?.STUDY_ID,this.globalStudy?.ROLE).subscribe(
        (success)=>{
          console.log(success)
            if(success.Table!=undefined && success.Table?.length!=0){
              // this.globalStudy=success?.Table1[0]
              this.globalStudyDetails=success.Table[0]
              let a=''
              this.globalPerm=success?.Table1[0]['PERMISSION']
              a=success?.Table1[0]['PERMISSION']
              this.perm=(a.split(""))
              this.menuService.permissions(this.globalPerm)
              this.menu.menuChange()
              this.spinner.hide()
            }
            else{
              // this.studies=[]
              this.globalStudy={}
              this.globalPerm=[]
              this.spinner.hide()

            }
        },
        (error)=>{
          console.log(error)
          this.spinner.hide()

        }
      )
    }
    else{
      this.spinner.hide()
    }
  }
  public getStudies(id): Observable<any>{
    const body={
      'UID':id
    }
    return this.http.post(environment.webserviceUrl+'api/Organization/GetStudyList',body)
  }
  public getStud(id,sid): Observable<any>{
    const body={
      "Action":"GETBYID",
      "StudyID":sid,
      "ID": id
    }
    console.log(id,sid)
    return this.http.post(environment.webserviceUrl+'api/Study/ManageStudyRole',body)
  }
  public studyDetails(id,sid,role): Observable<any>{
    const body={
      "USERID": id,
       "ID": sid,
       "ROLE_NAME":role
       
   }
    return this.http.post(environment.webserviceUrl+'api/study/GetStudyDetails',body)
  } 
  public getAllStudies(){
    return this.studies
  } 
    
  checkPerm(code){
    console.log(this.perm,code)
    if(this.perm[code]=='1'){
      return true
    }
    return false
  }

}
