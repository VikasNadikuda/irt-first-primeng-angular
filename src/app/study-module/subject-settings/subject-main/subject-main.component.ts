import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { CommonModule } from '@angular/common';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyRoleService} from '../../services/study-role.service'
import {StudySiteService} from '../../services/study-site.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import {SubjectSettingsService} from '../../services/subject-settings.service'
// import {} from '../../..'
const { jsPDF } = require("jspdf");
require('jspdf-autotable');

class TodoFilter {
  constructor(
    public Id: number,
    public lableName: string,
    public isSelected: boolean
  ) { }
}
class reportSt{
  constructor(
    public LABEL: string,
    public LABEL_NAME:string,
    public ID?: number,
    public STUDY_ID?: number,
    public CREATED_DATE?:string,
    public CREATED_BY?: number,
    public UPDATED_BY?: number,
    public UPDATED_DATE?:string
  ){
   
  }
 
  
}
@Component({
  selector: 'app-subject-main',
  templateUrl: './subject-main.component.html',
  styleUrls: ['./subject-main.component.css','../../../../assets/sass/scss/pages/app-todoapp.scss','../../../../assets/sass/scss/pages/app-todo.scss']
})
export class SubjectMainComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true ,maxScrollbarLength:240,suppressScrollX:true};
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public siteService:StudySiteService,
    public settingServ:SubjectSettingsService
  ) { }
  screening: FormGroup;
  visitConfig:FormGroup
  subgroup:FormGroup
  labelObj:any={}

  disSubgroup:FormGroup
  reportStatus:FormGroup
  general_types=[
    {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
    {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'}
  ]
  gender_types=[
    {LIBRARY_VALUE: 'Male', LIBRARY_ID: 'Male'},
    {LIBRARY_VALUE: 'Female', LIBRARY_ID: 'Female'},
    {LIBRARY_VALUE: 'Both', LIBRARY_ID: 'Both'}

  ]
  limited_types=[
    {LIBRARY_VALUE: 'Limited', LIBRARY_ID: 'Limited'},
    {LIBRARY_VALUE: 'Unlimited', LIBRARY_ID: 'Unlimited'},

  ]
  visitList=[]
  displayCode
  subjectList=[]
  activeItem:MenuItem
  // selectedSubjects=[1]
  suqbjectList = [
    {  ID:1 ,
    FIELD_NAME:"Subject Edit Data Points" ,
    
    isSelected: true  },
    {  Id: 2,
      FIELD_NAME:"Configuration Reasons" ,
      isSelected:false   },
    {  Id: 3,
      FIELD_NAME:"Screening Configuration" ,
      isSelected:false   },
    {  Id:4 ,
      FIELD_NAME:"Visit Configuration" ,
      isSelected:false  },
    {  Id:5 ,
      FIELD_NAME:"SubGroup Configuration" ,
      isSelected:false  },
    {  Id: 6,
      FIELD_NAME:"Discontinue Configuration" ,
      isSelected:false  },
    {  Id:7 ,
      FIELD_NAME:"Reporting Status" ,
      isSelected:false  },
    {  Id:8 ,
      FIELD_NAME:"Stratification Factors" ,
      isSelected:false  },
    {  Id: 9,
      FIELD_NAME:"Study Status" ,
      isSelected:false  }
  ];
  editScreening=false
  globalStudy
  globalID
  initialValues2
  initialValues1
  ngOnInit(): void {
    document.getElementById("defaultOpen").click();
    console.log(this.labelObj)
   this.editScreening=true
   this.screening = this.formBuilder.group({
    DOBREQUIRED: [null, Validators.required],
    MIN_VALUE: [null],
    MAX_VALUE: [null],
    STUDY_CODE: [null, Validators.required],
    GENDER_TYPE: [null, Validators.required],
    SUB_AUTOGEN: [null, Validators.required],
    START_ID: [null, Validators.required],
    RESCREEN: [null, Validators.required],
    SUBJECT_SCREEN_SUBGROUP:new FormArray([
      this.initSubgroup()
     ]),
    })
    this.visitConfig = this.formBuilder.group({
      SKIPPING_VISIT:[null, Validators.required],
      UNSCHEDULE_VISIT:[null, Validators.required],
      UNSCHEDULE_VISITTYPE:[null],
      VISIT_COUNT:[null],
      RUN_IN_FAILURE:[null, Validators.required],
      VISIT_ID:[null],
    })
    this.subgroup = this.formBuilder.group({
      SUBJECT_SUBGROUP :[null, Validators.required] ,
      ARM_ID:[null, Validators.required],
      CAP:[null, Validators.required]
    })
    this.disSubgroup = this.formBuilder.group({
      VISIT_ID :[null, Validators.required] ,
      MINDAYS:[null, Validators.required],
      TARGETDAYS:[null, Validators.required],
      MAXDAYS:[null, Validators.required],
    })
    this.reportStatus = this.formBuilder.group({
      SUBJECT_SEPARATE :[null, Validators.required] ,
      DESCRIPTION:[null, Validators.required],
    })
    this.initialValues2 = this.disSubgroup.value;
    this.initialValues1 = this.subgroup.value;
    this.initialValues = this.visitConfig.value;
    this.globalStudy=this.studyService.globalStudyDetails
    this.globalID=this.studyService.globalStudy?.STUDY_ID
      this.selectedSubjects=Object.assign(this.subjectList,{})
    this.settingServ.getAllSubjectPoints(this.globalID).subscribe(
      (success)=>{
        console.log(success)
          if(success.Table1?.length!=0 ){
            this.subjectList=success.Table1
            this.subjectList.forEach(element => {
              if(element.PERMISSION==1){
                this.selectedSubjects.push(element.FIELD_NAME)
        
              }
            })
          }
          else{
            this.subjectList=[]
          }
      },
      (error)=>{
        console.log(error)
        this.subjectList=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
 
    console.log(this.subjectList)
  }
  screen
  visitDet
  editVisit=true
  addScreen=false
  addVisit=false
  subgroupList=[]
  sgList=[]
  disSubgroupList=[]
  studyStatus:any
  studyObj:any
  label_list=[]
  statuses=[
    {LIBRARY_VALUE: 'Active', LIBRARY_ID: 'Active'},
    {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 'Inactive'},
    {LIBRARY_VALUE: 'Pending', LIBRARY_ID: 'Pending'},
    {LIBRARY_VALUE: 'Closed', LIBRARY_ID: 'Closed'},
    {LIBRARY_VALUE: 'Stop', LIBRARY_ID: 'Stop'}
  ]

 openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  this.toastr.clear()

  console.log(evt)
  if(cityName=='screening'){
    this.spinner.show()
    this.settingServ.getAllScreening(this.globalID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
          if(success.Table?.length!=0 ){
            this.screen=success.Table[0]
            let  val=this.screen?.SUBJECT_SCREEN_SUBGROUP.split('$')
            let valObjArr=[]
            this.screening = this.formBuilder.group({
              DOBREQUIRED: [null, Validators.required],
              MIN_VALUE: [null],
              MAX_VALUE: [null],
              STUDY_CODE: [null, Validators.required],
              GENDER_TYPE: [null, Validators.required],
              SUB_AUTOGEN: [null, Validators.required],
              START_ID: [null, Validators.required],
              RESCREEN: [null, Validators.required],
              SUBJECT_SCREEN_SUBGROUP:new FormArray([
                this.initSubgroup()
               ]),
              })
            // this.screening = this.formBuilder.group({
            //   DOBREQUIRED: [this.screen.DOBREQUIRED, Validators.required],
            //   MIN_VALUE: [this.screen.MIN_VALUE],
            //   MAX_VALUE: [this.screen.MAX_VALUE],
            //   STUDY_CODE: [this.screen.STUDY_CODE, Validators.required],
            //   GENDER_TYPE: [this.screen.GENDER_TYPE, Validators.required],
            //   SUB_AUTOGEN: [this.screen.SUB_AUTOGEN, Validators.required],
            //   START_ID: [this.screen.START_ID, Validators.required],
            //   RESCREEN: [this.screen.RESCREEN, Validators.required],
            //   SUBJECT_SCREEN_SUBGROUP:new FormArray([
            //     this.initSubgroup(),
            //    ]),
            //   })
            console.log(this.screening['controls']['DOBREQUIRED'])
            let control = this.screening.controls['DOBREQUIRED']
            console.log( this.screening.controls, this.screening.controls['DOBREQUIRED'])
            control.setValue(this.screen.DOBREQUIRED)
            let control1 = this.screening.controls['MIN_VALUE']
            control1.setValue(this.screen.MIN_VALUE)
            let control2 = this.screening.controls['MAX_VALUE']
            control2.setValue(this.screen.MAX_VALUE)
            let control3 = this.screening.controls['STUDY_CODE']
            control3.setValue(this.screen.STUDY_CODE)
            let control4 = this.screening.controls['GENDER_TYPE']
            control4.setValue(this.screen.GENDER_TYPE)
            let control5 = this.screening.controls['SUB_AUTOGEN']
            control5.setValue(this.screen.SUB_AUTOGEN)
            let control6 = this.screening.controls['START_ID']
            control6.setValue(this.screen.START_ID)
            let control7 = this.screening.controls['RESCREEN']
            control7.setValue(this.screen.RESCREEN)
            let valObj:any
            let valueCon=<FormArray>this.screening.controls['SUBJECT_SCREEN_SUBGROUP']
            console.log(valueCon)
            val.forEach(elem=> {
              valObj={
                'factorValue':elem
              }
              valObjArr.push(valObj)
            });
            console.log(valObjArr)
            valObjArr.forEach((element,index) => {
              if(index>0){
                this.addFactor(index)

              }
            });
            valObjArr.forEach((e,i)=>{
              // console.log(valObjArr[i])
              valueCon.controls[i].setValue(e)
            })
            // this.screening = this.formBuilder.group({
            //   DOBREQUIRED: [this.screen.DOBREQUIRED, Validators.required],
            //   MIN_VALUE: [this.screen.MIN_VALUE],
            //   MAX_VALUE: [this.screen.MAX_VALUE],
            //   STUDY_CODE: [this.screen.STUDY_CODE, Validators.required],
            //   GENDER_TYPE: [this.screen.GENDER_TYPE, Validators.required],
            //   SUB_AUTOGEN: [this.screen.SUB_AUTOGEN, Validators.required],
            //   START_ID: [this.screen.START_ID, Validators.required],
            //   RESCREEN: [this.screen.RESCREEN, Validators.required],
            //   SUBJECT_SCREEN_SUBGROUP:new FormArray([
            //     this.initSubgroup(),
            //    ]),
            //   })
          }
          else{
            this.addScreen=true
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.screen={}
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  else if(cityName=='visit'){
    this.spinner.show()
    this.settingServ.getAllVisits(this.globalID).subscribe(
      (success)=>{
        // this.spinner.hide()
        console.log(success)
          if(success.Table1?.length!=0 ){
            this.visitDet=success.Table1[0]
            this.visitConfig = this.formBuilder.group({
              SKIPPING_VISIT:[this.visitDet.SKIPPING_VISIT, Validators.required],
              UNSCHEDULE_VISIT:[this.visitDet.UNSCHEDULE_VISIT, Validators.required],
              UNSCHEDULE_VISITTYPE:[this.visitDet.UNSCHEDULE_VISITTYPE],
              VISIT_COUNT:[this.visitDet.VISIT_COUNT],
              RUN_IN_FAILURE:[this.visitDet.RUN_IN_FAILURE, Validators.required],
              VISIT_ID:[this.visitDet.VISIT_ID],
        })
          }
          else{
            this.addVisit=true
          }
          this.getvisits()
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.visitDet={}
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  else if(cityName=='subgroup'){
    this.spinner.show()
    this.settingServ.getAllSubGroup(this.globalID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
          if(success.Table1?.length!=0 ){
            this.subgroupList=success.Table1
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.subgroupList=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  else if(cityName=='discontinue'){
    this.spinner.show()
    this.settingServ.getAllDisc(this.globalID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
          if(success.Table1?.length!=0 ){
            this.disSubgroupList=success.Table1
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.disSubgroupList=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  else if(cityName=='reporting'){
    this.spinner.show()
    this.settingServ.getAllreport(this.globalID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
          if(success.Table1?.length!=0 ){
            this.label_list=success.Table1
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.label_list=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  else if(cityName=='status'){
    this.spinner.show()
    this.settingServ.getStatuses(this.globalID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
          if(success.Table1?.length!=0 ){
              let stObj=success.Table1[0]
              this.studyObj=success.Table1[0]
                  if(this.studyObj.COMMIT==1){
                    this.studyObj['checked']=true
                  }
                  else{
                    this.studyObj['checked']=false
                  }
              this.statuses.forEach(element => {
                if(element.LIBRARY_ID==stObj.STATUS){
                    this.studyStatus=element
                }
          });
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.label_list=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  this.toastr.clear()
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
  console.log( document.getElementById(cityName))
}
selectedSubjects=[]
getvisits(){
  this.settingServ.getAllVisits(this.globalID).subscribe(
    (success)=>{
      this.spinner.hide()
      console.log(success)
        if(success.Visit?.length!=0 ){
          this.visitList=success.Visit[0]
        }
        else{
          this.visitList=[]
        }
    },
    (error)=>{
      this.spinner.hide()
      console.log(error)
      this.visitList=[]
      this.toastr.error("", error.message,{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
  )
}
changed(subject,event){
  console.log(subject,event)
  this.subjectList.forEach(element => {
      if(element.FIELD_NAME==subject?.FIELD_NAME){
        if(event.checked.length!=0){
          element.PERMISSION=1
        }
        else{
          element.PERMISSION=0
        }
      }
  });
  console.log(this.subjectList)
}

updateSubjets(){
  console.log(this.selectedSubjects)
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  var body=[]
 this.subjectList.forEach(element => {
   if(this.selectedSubjects.indexOf(element.FIELD_NAME)>-1){
      element.PERMISSION=1
   }
   else{
    element.PERMISSION=0
   }
   let obj={
    "ID":element.ID,
    "Permission":element.PERMISSION,
    "StudyID":this.globalID,
    "UserID":uid,
    "Action" :"UPDATE"
   }
   body.push(obj)
 })
 var orgObject={
   'AddSubjectList':body
 }
 console.log(orgObject)
  this.spinner.show()
      this.settingServ.addUpdateSubject(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success?.Subject[0]
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
        console.log(error)
        this.spinner.hide()
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
 
}
    initialValues
  // editScreen(){
  //   this.editScreening=true
  //   this.screening = this.formBuilder.group({
  //     DOBREQUIRED: [this.screen.DOBREQUIRED, Validators.required],
  //     MIN_VALUE: [this.screen.MIN_VALUE],
  //     MAX_VALUE: [this.screen.MAX_VALUE],
  //     STUDY_CODE: [this.screen.STUDY_CODE, Validators.required],
  //     GENDER_TYPE: [this.screen.GENDER_TYPE, Validators.required],
  //     SUB_AUTOGEN: [this.screen.SUB_AUTOGEN, Validators.required],
  //     START_ID: [this.screen.START_ID, Validators.required],
  //     RESCREEN: [this.screen.RESCREEN, Validators.required],
  //     SUBJECT_SCREEN_SUBGROUP:new FormArray([
  //       this.initSubgroup(),
  //       ]),
  // })
  // this.initialValues = this.screening.value;

  // }
  initSubgroup(){
    console.log('553')
    return new FormGroup({
      factorValue: new FormControl('',Validators.required)
  });
    }
    removeStrat(i: number) {
      console.log(<FormArray>this.screening.get('SUBJECT_SCREEN_SUBGROUP'))
      const control = <FormArray>this.screening.get('SUBJECT_SCREEN_SUBGROUP');
      control.removeAt(i)
        // const control = < FormArray > this.addStrata.controls['factor'];
        // control.removeAt(i);
    }
    addFactor(j) {
      let control = <FormArray>this.screening.get('SUBJECT_SCREEN_SUBGROUP');
      control.push(this.initSubgroup()); 
    }
    getValues(factor){
      return factor.controls.SUBJECT_SCREEN_SUBGROUP.controls
      
    }
  cancelScreen(){
    this.editScreening=!this.editScreening
    this.screening.reset(this.initialValues)

  }
  updateScreens(type){
    console.log(this.subjectList,this.selectedSubjects)
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
   
    var orgObject=this.screening.value
    orgObject.UserID=uid
    orgObject.Action=type
    orgObject.STUDY_ID=this.globalID
    if(type=='UPDATE'){
      orgObject.ID=this.screen.ID
    }
    var subgroups=[]
    for(let i=0;i<orgObject.SUBJECT_SCREEN_SUBGROUP?.length;i++){
      subgroups.push(orgObject.SUBJECT_SCREEN_SUBGROUP[i].factorValue.toString())
    }
    orgObject.SUBJECT_SCREEN_SUBGROUP=subgroups.join('$')
    console.log(orgObject)
    this.spinner.show()
        this.settingServ.addUpdateScreening(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success?.Screen[0]
          if(sucObj?.ID==4 || sucObj?.ID==3){
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
          console.log(error)
          this.spinner.hide()
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
   
  }
  editVisits(){
    this.editVisit=true
    this.visitConfig = this.formBuilder.group({
        SKIPPING_VISIT:[this.visitDet.SKIPPING_VISIT, Validators.required],
        UNSCHEDULE_VISIT:[this.visitDet.UNSCHEDULE_VISIT, Validators.required],
        UNSCHEDULE_VISITTYPE:[null],
	      VISIT_COUNT:[null],
        RUN_IN_FAILURE:[this.visitDet.SKIPPING_VISIT, Validators.required],
        VISIT_ID:[null],
  })
  this.initialValues = this.visitConfig.value;

}
cancelVisit(){
  this.editVisit=!this.editVisit
  this.visitConfig.reset(this.initialValues)

}
updateVisit(type){
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  var orgObject=this.visitConfig.value
  orgObject.UserID=uid
  orgObject.Action=type
  orgObject.STUDY_ID=this.globalID
  if(type=='UPDATE'){
    orgObject.ID=this.visitDet.ID

  }
  console.log(orgObject,this.visitConfig.controls)
  this.spinner.show()
      this.settingServ.addUpdateVisit(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success?.Visit[0]
        if(sucObj?.ID==4 || sucObj?.ID==3){
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
        console.log(error)
        this.spinner.hide()
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
 
}
displaySubgroup=false
editSG=false
subGrpObj
treatList=[]
subGroupList=[]
subGroupTitle="Add SubGroup"
editSubGroup(obj){
  this.spinner.show()
  this.settingServ.getSubGroupDetails(this.globalID).subscribe(
    (success)=>{
      this.spinner.hide()
      console.log(success)
        if(success.Table?.length!=0 ){
          this.treatList=success.Table
        }
        if(success.Table1?.length!=0 ){
          this.sgList=[]
          var arr=success.Table1[0].SUBJECT_SCREEN_SUBGROUP.split("$")
          console.log(arr)
          arr.forEach(element => {
              let obj={}
              obj['LIBRARY_VALUE']=element
              obj['LIBRARY_ID']=element
              this.sgList.push(obj)
          });
          this.subgroup = this.formBuilder.group({
            SUBJECT_SUBGROUP :[obj.SUBJECT_SUBGROUP, Validators.required] ,
            ARM_ID:[obj.ARM_ID, Validators.required],
            CAP:[obj.CAP, Validators.required]
          })
        }
        console.log(arr)
    },
    (error)=>{
      this.spinner.hide()
      console.log(error)
      this.visitList=[]
      this.toastr.error("", error.message,{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
  )
  this.displaySubgroup=true

  if(obj!=null){
    this.subGroupTitle="Edit SubGroup"
    this.editSG=true
    this.subGrpObj=obj
    console.log(obj)
    this.subgroup = this.formBuilder.group({
      SUBJECT_SUBGROUP :[obj.SUBJECT_SUBGROUP, Validators.required] ,
      ARM_ID:[obj.ARM_ID, Validators.required],
      CAP:[obj.CAP, Validators.required]
    })
  }
  else{
    this.editSG=false
    this.subgroup = this.formBuilder.group({
      SUBJECT_SUBGROUP :[null, Validators.required] ,
      ARM_ID:[null, Validators.required],
      CAP:[null, Validators.required]
    })
  }
}

saveSubgroup(type){
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  var orgObject=this.subgroup.value
  orgObject.USERID=uid
  orgObject.Action=type
  orgObject.STUDY_ID=this.globalID
  if(type=='UPDATE'){
    orgObject.ID=this.subGrpObj.ID

  }
  this.spinner.show()
      this.settingServ.addUpdateSubGroup(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success?.SubGroup[0]
        if(sucObj?.ID==4 || sucObj?.ID==3){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          }); 
          if(success.Table1?.length!=0){
            this.subgroupList=success.Table1

          }

          this.displaySubgroup=false
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
        console.log(error)
        this.spinner.hide()
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
 
}
displaydisSubgroup=false
editDSG=false
disSbGrpObj
visitsList=[]
disSubGroupTitle="Add Configuration"
editdisSubGroup(obj){
  this.spinner.show()
  this.settingServ.getVisits(this.globalID).subscribe(
    (success)=>{
      this.spinner.hide()
      console.log(success)
        if(success.Table1?.length!=0 ){
          this.visitsList=success.Table1
        }
    },
    (error)=>{
      this.spinner.hide()
      console.log(error)
      this.visitsList=[]
      this.toastr.error("", error.message,{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
  )
  this.displaydisSubgroup=true

  if(obj!=null){
    this.disSubGroupTitle="Edit Configuration"
    this.editDSG=true
    this.disSbGrpObj=obj
    this.disSubgroup = this.formBuilder.group({
      VISIT_ID :[obj.VISIT_ID, Validators.required] ,
      MINDAYS:[obj.MINDAYS, Validators.required],
      TARGETDAYS:[obj.TARGETDAYS, Validators.required],
      MAXDAYS:[obj.MAXDAYS, Validators.required],
    })
  }
  else{
    this.editDSG=false
    this.disSubgroup = this.formBuilder.group({
      VISIT_ID :[null, Validators.required] ,
      MINDAYS:[null, Validators.required],
      TARGETDAYS:[null, Validators.required],
      MAXDAYS:[null, Validators.required],
    })
  }
}
editLabel=false
items: MenuItem[];


savedisSubgroup(type){
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  var orgObject=this.disSubgroup.value
  orgObject.USERID=uid
  orgObject.Action=type
  orgObject.STUDY_ID=this.globalID
  if(type=='UPDATE'){
    orgObject.ID=this.disSbGrpObj.ID

  }
  this.spinner.show()
      this.settingServ.addUpdateDisc(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success?.Visit[0]
        if(sucObj?.ID==4 || sucObj?.ID==3){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          if(success.Table1?.length!=0){
            this.disSubgroupList=success.Table1
          }
          this.displaydisSubgroup=false
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
showAddReport
statusTitle="Add a Label"
addObj
editObj
library_list=[]
openeditLabel(obj){
  this.spinner.show()
  this.editObj=obj
  this.showAddReport=true
  if(obj!=null){
    this.editLabel=true
    this.statusTitle='Edit Label'
    this.reportStatus = this.formBuilder.group({
      SUBJECT_SEPARATE :[obj.LABEL, Validators.required] ,
      DESCRIPTION:[obj.LABEL_NAME, Validators.required],
    })
    this.settingServ.getLabels().subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
          if(success.Table1?.length!=0 ){
            this.library_list=success.Table1
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.label_list=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  else{
    this.editLabel=false
    this.reportStatus = this.formBuilder.group({
      SUBJECT_SEPARATE :[null, Validators.required] ,
      DESCRIPTION:[null, Validators.required],
    })
    this.settingServ.getLabels().subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
          if(success.Table1?.length!=0 ){
            this.library_list=success.Table1
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.label_list=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  
  
}
addUpdateReport(type){
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  var orgObject=this.reportStatus.value
  orgObject.USERID=uid
  orgObject.Action=type
  orgObject.ID=null
  orgObject.STUDYID=this.globalID
  if(type=='ADD'){
    this.showAddReport=true
    this.settingServ.addUpdatereport(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success?.Study[0]
        if(sucObj?.ID==4 || sucObj?.ID==3){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.label_list=success.Table1
          this.showAddReport=false
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
        console.log(error)
        this.spinner.hide()
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
 
  }
  else{
  orgObject.ID=this.editObj.ID
  this.settingServ.addUpdatereport(orgObject).subscribe(
    (success)=>{
      console.log(success)
      this.spinner.hide()
      let sucObj=success?.Study[0]
      if(sucObj?.ID==4 || sucObj?.ID==3){
        this.toastr.success("", sucObj.Message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
        this.label_list=success.Table1
        this.showAddReport=false
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
      console.log(error)
      this.spinner.hide()
      this.toastr.error("", error.message,{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
  )
  }
}
updateStatus1(type){
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  var orgObject:any
  this.studyObj.STATUS=this.studyStatus?.LIBRARY_ID
  this.studyObj.Action='STATUS'
  this.studyObj.ID=this.globalID
  this.settingServ.addUpdateStatus(this.studyObj).subscribe(
    (success)=>{
      console.log(success)
      this.spinner.hide()
      let sucObj=success?.Study[0]
      if(sucObj?.ID==4 || sucObj?.ID==3){
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
      console.log(error)
      this.spinner.hide()
      this.toastr.error("", error.message,{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
  )
}
updateStatus(){
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  var orgObject:any
  if(this.studyObj.checked){
    this.studyObj.COMMIT=1
  } 
  else{
    this.studyObj.COMMIT=0
  }
  this.studyObj.Action='COMMIT'
  this.studyObj.ID=this.globalID
  this.settingServ.addUpdateStatus(this.studyObj).subscribe(
    (success)=>{
      console.log(success)
      this.spinner.hide()
      let sucObj=success?.Study[0]
      if(sucObj?.ID==4 || sucObj?.ID==3){
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
      console.log(error)
      this.spinner.hide()
      this.toastr.error("", error.message,{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
  )
}

}
