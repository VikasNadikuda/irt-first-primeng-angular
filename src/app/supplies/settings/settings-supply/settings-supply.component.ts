import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService  } from "ngx-toastr";
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import {SupplyServiceService} from '../../services/supply-service.service'
@Component({
  selector: 'app-settings-supply',
  templateUrl: './settings-supply.component.html',
  styleUrls: ['./settings-supply.component.css']
})
export class SettingsSupplyComponent implements OnInit {
  @BlockUI('supplyInfo') loader: NgBlockUI;
  title:any='Supply Info'
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    public studyService:StudyServiceService,
    public supplyService:SupplyServiceService
  ) { }
  breadcrumb: any;
  addOrEditSupplyInfo: FormGroup;
  submitButton='ADD'
  showLoading:boolean=true

  globalID


  seq_types=[
    {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
    {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'}
  ]
  ngOnInit(): void {
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this.spinner.show()      
    this.addOrEditSupplyInfo=this.formBuilder.group({
      Sequence:['',Validators.required]
    })
    this.supplyService.getSequence(this.globalID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success,success?.Table1?.length)
        if(success?.Table1?.length!=0 ){
          this.submitButton='Update'
          
          this.addOrEditSupplyInfo=this.formBuilder.group({
            Sequence:[success?.Table1[0]?.SEQUENCE_NUM,Validators.required],
            ID:[success?.Table1[0]?.ID]
          })
        }
        else{
          this.submitButton='Add'
          this.addOrEditSupplyInfo=this.formBuilder.group({
            Sequence:[null,Validators.required]
          })
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
  }
  saveSettings(){
    this.spinner.show()
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    if(this.submitButton=='Add'){
      var body={
        "Action":'ADD',
        'Sequence':this.addOrEditSupplyInfo.controls.Sequence.value,
        'StudyID':this.globalID,
        'UserID':uid
      }
      this.supplyService.addUpdateSequence(body).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Supplies[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.submitButton='UPDATE'
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
          // this.addOrEditDepot.reset()
          // console.log(sucObj)
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
    else{
      var bod={
        "Action":'UPDATE',
        'Sequence':this.addOrEditSupplyInfo.controls.Sequence.value,
        'StudyID':this.globalID,
        'UserID':uid,
        'ID':this.addOrEditSupplyInfo.controls.ID.value
      }
      this.supplyService.addUpdateSequence(bod).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Supplies[0]
          if(sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.submitButton='UPDATE'
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
          // this.addOrEditDepot.reset()
          // console.log(sucObj)
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
  cancel(){
    this.ngOnInit()
  }

}
