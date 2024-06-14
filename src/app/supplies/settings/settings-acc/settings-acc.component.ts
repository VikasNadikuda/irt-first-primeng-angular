import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganisationsService } from "../../../services/organisations.service";
import {ToastrService  } from "ngx-toastr";
import { FileUpload } from 'primeng/fileupload';
import * as FileSaver from 'file-saver';
const { jsPDF } = require("jspdf");
import {LibraryService} from '../../../services/library.service'
import {AccountabilityService} from '../../services/accountability.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
@Component({
  selector: 'app-settings-acc',
  templateUrl: './settings-acc.component.html',
  styleUrls: ['./settings-acc.component.css']
})
export class SettingsAccComponent implements OnInit {
  @BlockUI('settAccount') loader: NgBlockUI;
  title="Accountability"
  breadcrumb
  selectedSubjects=[]
  upd:any
  initialValues=[]
  accList=[
    'Returns',
    'Reconcile',
    'Compliance',
    'Destruction'
  ]
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private service:AccountabilityService,
    private studyService:StudyServiceService,
    private spinner:NgxSpinnerService,
  ) { }
  globalID
  submitButton='Add'
  ngOnInit(): void {
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this.spinner.show()

    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Settings',
          'isLink': true,
          'link': '/supply/settings'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
    this.service.getAccount(this.globalID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
        if(success?.Table1?.length!=0){
          this.submitButton='Update'
          this.upd=success?.Table1[0]
          this.selectedSubjects=success?.Table1[0].ACCOUNTABILITY.split(',')
          this.initialValues=success?.Table1[0].ACCOUNTABILITY.split(',')
        }
        else{
          this.submitButton='Add'

        }
      },
      (error)=>{
        console.log(error)
        this.spinner.hide()
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  ngOnDestroy(){
    this.toastr.clear()

  }
  saveAcc(){
    console.log(this.selectedSubjects)
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    let str=this.selectedSubjects.join(',')
 
    const uid=Number(userObject.u_id)
    let obj:any={
      "Accountability":  str,
      "StudyID":this.globalID,
      "UserID":uid
    }
    this.spinner.show()
    if(this.submitButton=='Add'){
      obj.Action="ADD"
      this.service.addUpdateAcc(obj).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Supplies[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.submitButton='Update'
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.selectedSubjects=this.initialValues

          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 ){
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.selectedSubjects=this.initialValues

          }
          else{
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.selectedSubjects=this.initialValues

          }
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.selectedSubjects=this.initialValues

        }
      )
    }
    else{
      obj.Action="UPDATE"
      obj.ID=this.upd.ID
      this.service.addUpdateAcc(obj).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Supplies[0]
          if(sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.selectedSubjects=this.initialValues

          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 ){
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.selectedSubjects=this.initialValues

          }
          else{
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.selectedSubjects=this.initialValues

          }
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.selectedSubjects=this.initialValues

        }
      )
    }

  }
  cancel(){
    // this.selectedSubjects=this.initialValues
    this.ngOnInit()

  }
}
