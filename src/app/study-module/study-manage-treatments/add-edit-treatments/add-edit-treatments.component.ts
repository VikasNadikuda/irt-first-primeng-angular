import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService  } from "ngx-toastr";
import {TreatmentsService} from '../../services/treatments.service';
import {StudyRoleService} from '../../services/study-role.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
@Component({
  selector: 'app-add-edit-treatments',
  templateUrl: './add-edit-treatments.component.html',
  styleUrls: ['./add-edit-treatments.component.css']
})
export class AddEditTreatmentsComponent implements OnInit {
  @BlockUI('addTreatment') loader: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    public treatService:TreatmentsService,
    public studyService:StudyServiceService
  ) { }
  title='Add Treatment'
  breadcrumb: any;
  addOrEditTreatment: FormGroup;
  countries =[];
  states=[]
  cities=[]
  submitButton='ADD'
  showLoading:boolean=true
  editDetails
  list_names=[]
  list_ids=[]
  initialValues
  globalID
  ngOnInit(): void {
    this.editDetails=history.state.treatDetails
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    if(this.editDetails==undefined){
      this.addOrEditTreatment = this.formBuilder.group({
        TreatmentID: [null, [Validators.required,Validators.maxLength(100)]],
        TreatmentName: [null, [Validators.required,Validators.maxLength(100)]],
        Description: [null, [Validators.required,Validators.maxLength(250)]],
        Ratio: [null, [Validators.required,Validators.min(0)]],
      });
    }
    else if(this.editDetails!=undefined){
      this.title='Edit Kit Type'
      this.submitButton='UPDATE'
      this.addOrEditTreatment = this.formBuilder.group({
        TreatmentID: [this.editDetails.TREATMENT_ID, [Validators.required,Validators.maxLength(100)]],
        TreatmentName: [this.editDetails.TREATMENT_NAME, [Validators.required,Validators.maxLength(100)]],
        Description: [this.editDetails.DESCRIPTION, [Validators.required,Validators.maxLength(250)]],
        Ratio: [this.editDetails.RATIO, [Validators.required,Validators.min(0)]],
      });


    }
    this.initialValues = this.addOrEditTreatment.value;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Treatment',
          'isLink': true,
          'link': '/study/manageTreatments'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
        },
      ]
    };
  }
  saveTreatment(){
    this.spinner.show()
    var orgObject=this.addOrEditTreatment.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.UserID=uid
    // orgObject.UID=uid
    orgObject.StudyID=this.globalID

    if(this.submitButton=='ADD'){
      orgObject.Action='ADD'
      this.treatService.addUpdateTreatment(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success?.Treatment[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.addOrEditTreatment.reset()

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
      this.treatService.addUpdateTreatment(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success?.Treatment[0]
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
  resetForm(){
    // this.addOrEditTreatment.removeValues()
    // this.ngOnInit()
    this.addOrEditTreatment.reset(this.initialValues)
  }
}
