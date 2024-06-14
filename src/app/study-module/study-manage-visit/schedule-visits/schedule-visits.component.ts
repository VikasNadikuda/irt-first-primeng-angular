import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationsService } from "../../../services/organisations.service";
import { FileUpload } from 'primeng/fileupload';
import {LibraryService} from '../../../services/library.service'
import * as FileSaver from 'file-saver';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import { StudyVisitsService } from '../../services/study-visits.service';
import {CohartService} from '../../services/cohart.service'
const { jsPDF } = require("jspdf");
@Component({
  selector: 'app-schedule-visits',
  templateUrl: './schedule-visits.component.html',
  styleUrls: ['./schedule-visits.component.css']
})
export class ScheduleVisitsComponent implements OnInit {
  @BlockUI('addUser') loader: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public cohartService:CohartService,
    public visitService:StudyVisitsService
  ) { }
  public breadcrumb: any;
  title='Visit Schedule Setup'
  scheduleSetup: FormGroup;
  submitButton='ADD'
  window_types=[
    {LIBRARY_VALUE: 'Hard', LIBRARY_ID: 'Hard'},
    {LIBRARY_VALUE: 'Soft', LIBRARY_ID: 'Soft'}
  ]
  general_types=[
    {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
    {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'},]
    roles=[]
      countries=[]
  orgNames=[]
  globalID
  editDetails
  cohort_list
  studyDetails
  ngOnInit(): void {
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this.studyDetails=this.studyService.globalStudyDetails
    if(this.studyDetails?.COHORT=='Yes'){
      this.cohartService.getList(this.globalID).subscribe(
        (success)=>{
          console.log(success)
          this.loader.stop()
            if(success.Table1?.length!=0  ){
              this.cohort_list=success.Table1
  
              // this.display=true
            }
            else{
              this.cohort_list=[]
  
              this.loader.stop()
            }
        },
        (error)=>{
          this.loader.stop()
          console.log(error)
          this.cohort_list=[]
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
  
    }
    this.editDetails=history.state.visitDetails
    if(this.editDetails==undefined){
      this.scheduleSetup = this.formBuilder.group({
        VISITNAME: [null, [Validators.required,Validators.maxLength(200)]],
        DESCRIPTION: [null, [Validators.required,Validators.maxLength(200)]],
        RANDOMIZATION: [null, Validators.required],
        VISITORDER: [null, Validators.required],
        ASSIGN_TREATMENT: [null, Validators.required],
        NEXTVISIT: [null, Validators.required],
        COHORT_ID: [null],
        WINDOW_TYPE: [null, Validators.required],
        TARGETDAYS: [null, Validators.required],
        MAXDAYS: [null, Validators.required],
        MINDAYS: [null, Validators.required]
      });
    }
    else{
      this.submitButton='UPDATE'
      this.scheduleSetup = this.formBuilder.group({
        VISITNAME: [this.editDetails.VISITNAME, [Validators.required,Validators.maxLength(200)]],
        DESCRIPTION: [this.editDetails.DESCRIPTION, [Validators.required,Validators.maxLength(200)]],
        RANDOMIZATION: [this.editDetails.RANDOMIZATION, Validators.required],
        VISITORDER: [this.editDetails.VISITORDER, Validators.required],
        ASSIGN_TREATMENT: [this.editDetails.ASSIGN_TREATMENT, Validators.required],
        NEXTVISIT: [this.editDetails.NEXTVISIT, Validators.required],
        COHORT_ID: [this.editDetails.COHORT_ID],
        WINDOW_TYPE: [this.editDetails.WINDOW_TYPE, Validators.required],
        TARGETDAYS: [this.editDetails.TARGETDAYS, Validators.required],
        MAXDAYS: [this.editDetails.MAXDAYS, Validators.required],
        MINDAYS: [this.editDetails.MINDAYS, Validators.required]
      });
    }
  
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Visits Information',
          'isLink': true,
          'link': '/study/manageVisit'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
    this.initialValue=this.scheduleSetup.value
  }
  initialValue
  ngOnDestroy(){
    this.toastr.clear()
  }
  resetForm(){
    this.scheduleSetup.reset()
    // this.ngOnInit()
  }
  saveSetup(){  
    this.spinner.show()
    var orgObject=this.scheduleSetup.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.USERID=uid
    // orgObject.UID=uid
    orgObject.STUDY_ID=this.globalID

    if(this.submitButton=='ADD'){
      orgObject.Action='ADD'
      this.visitService.addUpdateKitType(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Visit[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.scheduleSetup.reset()
            // this.submitButton='UPDATE'
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 ){
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          // this.scheduleSetup.reset()
          console.log(sucObj)
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
    }
    else if(this.submitButton=='UPDATE'){
      orgObject.Action='UPDATE'
      orgObject.ID=this.editDetails.ID
      console.log(orgObject)
      this.visitService.addUpdateKitType(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Visit[0]
          if(sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 ){
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
    }

  }
}
