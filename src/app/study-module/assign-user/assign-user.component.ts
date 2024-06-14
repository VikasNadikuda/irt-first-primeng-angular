import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationsService } from "../../services/organisations.service";
import { FileUpload } from 'primeng/fileupload';
import {LibraryService} from '../../services/library.service'
import * as FileSaver from 'file-saver';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import { StudyVisitsService } from '../services/study-visits.service';
import {CohartService} from '../services/cohart.service'
import { StudyUsersServService } from '../services/study-users-serv.service';
const { jsPDF } = require("jspdf");
@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})
export class AssignUserComponent implements OnInit {
  @BlockUI('assignUsers') loader: NgBlockUI;
  public breadcrumb: any;
  title='Assign User'
  globalID
  orgId
  assignUser: FormGroup;
  submitButton='Assign'
  user_list:any=[];
  depot_list=[]
  roles_list=[]
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public cohartService:CohartService,
    public visitService:StudyVisitsService,
    private userService:StudyUsersServService
  ) { }
  statuses=[ {LIBRARY_VALUE: 'Active', LIBRARY_ID: "Active"},
  {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 'Inactive'},
  {LIBRARY_VALUE: 'Training Pending', LIBRARY_ID: 'Training Pending'},

]
  blinded_types=[
    {LIBRARY_VALUE: 'Blinded', LIBRARY_ID: 'Blinded'},
    {LIBRARY_VALUE: 'Unblinded', LIBRARY_ID: 'Unblinded'}
  ]
  ngOnInit(): void {
    this.assignUser = this.formBuilder.group({
      USER_ID: [null, Validators.required],
      SITE_ID: [null],
      ROLE_ID: [null, Validators.required],
      USER_TYPE: [null, Validators.required],
    })
    this.globalID=this.studyService.globalStudy?.STUDY_ID  
    this.orgId=this.studyService.globalStudy?.ORG_ID  
    console.log(this.globalID,this.orgId,this.studyService.globalStudy)
    this.userService.getUserRequiredDetails(this.globalID,this.orgId).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
        this.user_list=success?.Table
        this.depot_list=success?.Table1
        this.roles_list=success?.Table2
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Assigned Users',
          'isLink': true,
          'link': '/study/manageUsers'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  resetForm(){
    this.assignUser.reset()
    // this.ngOnInit()
  }
  saveUsers(){  
    this.spinner.show()
    var orgObject=this.assignUser.value
    var sites=orgObject.SITE_ID
    var str=sites.toString()
    orgObject.SITE_ID=str
    orgObject.STATUS="Active"
    
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.USERID=uid
    // orgObject.UID=uid
    orgObject.STUDY_ID=this.globalID

    if(this.submitButton=='Assign'){
      orgObject.Action='ADD'
      this.userService.addUpdateUser(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Visit[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.assignUser.reset()
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
          // this.assignUser.reset()
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

  }
}
