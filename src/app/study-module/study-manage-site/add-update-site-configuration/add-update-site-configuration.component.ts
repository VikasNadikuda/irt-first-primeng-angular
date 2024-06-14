import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyRoleService} from '../../services/study-role.service'
import {StudySiteService} from '../../services/study-site.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-add-update-site-configuration',
  templateUrl: './add-update-site-configuration.component.html',
  styleUrls: ['./add-update-site-configuration.component.css']
})
export class AddUpdateSiteConfigurationComponent implements OnInit {
  @BlockUI('siteConfig') loader: NgBlockUI;
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true ,maxScrollbarLength:240,suppressScrollX:true};

  public breadcrumb: any;

  title='Add Site Configuration'
  globalID
  orgID
  orgId
  addUpdateConfig: FormGroup;
  submitButton='ADD'
  user_list:any=[];
  depot_list=[]
  roles_list=[]
  sites=[]
  order_approvals=[
    {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
    {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'}
  ]
  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public siteService:StudySiteService
  ) { }
  siteDetails
  subgroup=[]
  studyDetails
  initialValues
  ngOnInit(): void {
    this.spinner.show()
    this.siteDetails=history.state.siteDetails
    this.sites=history.state.siteDetails
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this.studyDetails=this.studyService.globalStudyDetails
    this.orgId=this.studyService.globalStudy?.ORG_ID
    console.log(this.studyService.globalStudy)
    console.log(this.siteDetails)
    if(this.siteDetails==undefined){
      this.addUpdateConfig = this.formBuilder.group({
        Site_ID: [null, Validators.required],
        SITE_CAP: [null, [Validators.required,Validators.max(500)]],
        SITE_CAP_ALERT_LEVEL: [null, [Validators.required,Validators.max(500)]],
        ORDER_APPROVAL: [null, Validators.required],
        SITE_SUBGROUP: [null],
        SITE_DTS: ['Regular'],

      });
    }
    else if(this.siteDetails!=undefined){
      this.title='Edit Site Configuration'
      this.submitButton='UPDATE'
      let v=[]
      let val=[]
      if(this.siteDetails.SITE_SUBGROUP.length!=0){
        v=this.siteDetails.SITE_SUBGROUP.split('$')
      }
      v.forEach(element => {
          let obj={
            'ID':element,
            'NAME':element
          }
          val.push(obj)
      });
      console.log(val)
      this.addUpdateConfig = this.formBuilder.group({
        Site_ID: [this.siteDetails.SITE_ID, Validators.required],
        SITE_CAP: [this.siteDetails.SITE_CAP, [Validators.required,Validators.max(500)]],
        SITE_CAP_ALERT_LEVEL: [this.siteDetails.SITE_CAP_ALERT_LEVEL, [Validators.required,Validators.max(500)]],
        ORDER_APPROVAL: [this.siteDetails.ORDER_APPROVAL, Validators.required],
        SITE_SUBGROUP: [val],
        SITE_DTS: [this.siteDetails.SITE_DTS],

      });
    }
    this.getConfigDetails()
    this.initialValues = this.addUpdateConfig.value;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Site Configuration Information',
          'isLink': true,
          'link': '/study/manageSite/siteConfiguration'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
        },
      ]
    };
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  dtp_list=[]
  resetForm(){
    // this.addUpdateConfig.removeValues()
    // this.ngOnInit()
    this.addUpdateConfig.reset(this.initialValues)
  }
  getConfigDetails(){
    console.log(this.orgId)
    this.siteService.getSiteConfig(this.globalID,this.orgId).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
        if(success.Table!=undefined && success.Table?.length!=0){
          this.sites=success.Table
        }
        else{
          this.sites=[]
        }
        if(success.Table1!=undefined && success.Table1?.length!=0){
          let list=success.Table1[0]?.SUBJECT_SCREEN_SUBGROUP.split('$')
          list.forEach(element => {
              let obj={
                'ID':element,
                'NAME':element
              }
              this.subgroup.push(obj)
          });
        }
        else{
          this.subgroup=[]
        }
        if(success.Table2!=undefined && success.Table2?.length!=0){
          this.dtp_list=success.Table2
        }
        else{
          this.dtp_list=[]
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
  saveConfig(){
    this.spinner.show()
    var orgObject=this.addUpdateConfig.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.UserID=uid
    console.log(orgObject)
    let sub=orgObject.SITE_SUBGROUP.join('$')
    console.log(orgObject)
    orgObject.SITE_SUBGROUP=sub
    // orgObject.UID=uid
    orgObject.Study_ID=this.globalID
    if(this.submitButton=='ADD'){
      orgObject.Action='ADD'
      this.siteService.addUpdateConfig(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.SiteConfig[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            // this.submitButton='UPDATE'
            this.addUpdateConfig.reset()

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
      orgObject.SID=this.siteDetails.ID
      console.log(orgObject)
      this.siteService.addUpdateConfig(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.SiteConfig[0]
          if(sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.initialValues=this.addUpdateConfig.value
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
