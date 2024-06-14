import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService  } from "ngx-toastr";
import {ManageStudyService} from '../../services/manage-study.service';
import {StudyRoleService} from '../../services/study-role.service';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
@Component({
  selector: 'app-add-edit-studies',
  templateUrl: './add-edit-studies.component.html',
  styleUrls: ['./add-edit-studies.component.css']
})
export class AddEditStudiesComponent implements OnInit {
  @BlockUI('addStudy') loader: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    public studyService:StudyServiceService,
    public studService:ManageStudyService
  ) { }
  title='Add Study'
  breadcrumb: any;
  addOrEditStudy: FormGroup;
  countries =[];
  states=[]
  cities=[]
  submitButton='ADD'
  showLoading:boolean=true
  editRole
  studyDetails
  list_names=[] 
  list_ids=[]
  initialValues
  globalID
  blinded_types=[
    {LIBRARY_VALUE: 'Blinded', LIBRARY_ID: 'Blinded'},
    {LIBRARY_VALUE: 'Open Label', LIBRARY_ID: 'Open Label'}
  ]
  general_types=[
    {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
    {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'}
  ]
  enrollment_types=[
    {LIBRARY_VALUE: 'Enrollment', LIBRARY_ID: 'Enrollment'},
    {LIBRARY_VALUE: 'Randomized', LIBRARY_ID: 'Randomized'}
  ]
  kit_rep_types=[
    {LIBRARY_VALUE: 'Kit Number', LIBRARY_ID: 'Kit Number'},
    {LIBRARY_VALUE: 'Inventory', LIBRARY_ID: 'Inventory'}
  ]
  inventory_types=[
    {LIBRARY_VALUE: 'Bulk', LIBRARY_ID: 'Bulk'},
    {LIBRARY_VALUE: 'Discrete', LIBRARY_ID: 'Discrete'},
    {LIBRARY_VALUE: 'Bulk & Discrete', LIBRARY_ID: 'Bulk & Discrete'}
  ]
  rand_types=[
    {LIBRARY_VALUE: 'Limited', LIBRARY_ID: 'Limited'},
    {LIBRARY_VALUE: 0, LIBRARY_ID: 'Unlimited'}
  ]
  editStudy
  ngOnInit(): void {
    console.log(this.studyService.globalStudy)
    this.globalID=this.studyService.globalStudy?.ORG_ID
    this.editStudy=history.state.studyDetails
    if(this.editStudy==undefined){
      this.addOrEditStudy = this.formBuilder.group({
        PROTOCAL_ID: [null, [Validators.required,Validators.maxLength(50)]],
        STUDY_CODE: [null, [Validators.required,Validators.maxLength(50)]],
        CONTACT_NAME: [null, [Validators.required,Validators.maxLength(100)]],
        PHONE_NUMBER: [null, [Validators.required,Validators.maxLength(30)]],
        DESCRIPTION: [null, [Validators.required,Validators.maxLength(500)]],
        
        BLINDED_TYPE: [null,[Validators.required]],
        BLINDED_APPROVAL:[null],
        TREAT_ASSIGN: [null,[Validators.required]],
        // type-->add type--added as of now
        SITE_AS_FACTOR: [0],//stratification factor checkbox
        
        
        SUBJECT_LENGTH: [null, Validators.required], //number
        SUBJECT_SEPARATE: [null,[Validators.required,Validators.pattern(/^[@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i),Validators.maxLength(1)]],
        FOLLOWUP_DIS: [null, Validators.required],
        SUBGROUP: [null, Validators.required],
        STRATA_FACTOR: [null, Validators.required], 
        DTP: [null, Validators.required],
    
        //add header force randomization
        FORCED_RAND: [null, Validators.required], //yes or no 
        FORCED_TYPE: [null], //if yes limited unlimited ...if unlimited pass zero
        FORCED_COUNT:[null,[Validators.min(1),Validators.max(999)]],// if limited, enter value minimum 1 ,number
        
        
        SHIPMENT_ID: [null, Validators.required],
        AUTO_ORDER: [null, Validators.required], //yes, no
        KIT_REPLACEMENT: [null,Validators.required], //kit number,inventory
        INVENTORY: [null,Validators.required],//bulk , discrete,bulk & discrete
        KIT_DESTRUCTION: [null, Validators.required], //yes,no
        DRUG_POOLING: [null, Validators.required], //yes,no
    
        COHORT: [null, Validators.required], //yes no
    
        SCREENING_CAP: [null, Validators.required], //number
        SCREENING_ALERT: [null, Validators.required],//number
        STUDY_CAP: [null, Validators.required],//number
        STUDY_CAP_ALERT: [null, Validators.required],//number
      })
    }
    else{
      this.addOrEditStudy = this.formBuilder.group({
        PROTOCAL_ID: [this.editStudy.PROTOCAL_ID, [Validators.required,Validators.maxLength(50)]],
        STUDY_CODE: [this.editStudy.STUDY_CODE, [Validators.required,Validators.maxLength(50)]],
        CONTACT_NAME: [this.editStudy.CONTACT_NAME, [Validators.required,Validators.maxLength(100)]],
        PHONE_NUMBER: [this.editStudy.PHONE_NUMBER, [Validators.required,Validators.maxLength(30)]],
        DESCRIPTION: [this.editStudy.DESCRIPTION, [Validators.required,Validators.maxLength(500)]],
        
        BLINDED_TYPE: [this.editStudy.BLINDED_TYPE,[Validators.required]],
        BLINDED_APPROVAL:[this.editStudy.BLINDED_APPROVAL],
        TREAT_ASSIGN: [this.editStudy.TREAT_ASSIGN,[Validators.required]],
        // type-->add type--added as of now
        SITE_AS_FACTOR: [this.editStudy.SITE_AS_FACTOR],//stratification factor checkbox
        
        
        SUBJECT_LENGTH: [this.editStudy.SUBJECT_LENGTH, Validators.required], //number
        SUBJECT_SEPARATE: [this.editStudy.SUBJECT_SEPARATE,[Validators.required,Validators.pattern(/^[@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i),Validators.maxLength(1)]],
        FOLLOWUP_DIS: [this.editStudy.FOLLOWUP_DIS, Validators.required],
        SUBGROUP: [this.editStudy.SUBGROUP, Validators.required],
        STRATA_FACTOR: [this.editStudy.STRATA_FACTOR, Validators.required], 
        DTP: [this.editStudy.DTP, Validators.required],
    
        //add header force randomization
        FORCED_RAND: [this.editStudy.FORCED_RAND, Validators.required], //yes or no 
        FORCED_TYPE: [this.editStudy.FORCED_TYPE], //if yes limited unlimited ...if unlimited pass zero
        FORCED_COUNT:[this.editStudy.FORCED_COUNT,Validators.min(1)],// if limited, enter value minimum 1 ,number
        
        
        SHIPMENT_ID: [this.editStudy.SHIPMENT_ID, Validators.required],
        AUTO_ORDER: [this.editStudy.AUTO_ORDER, Validators.required], //yes, no
        KIT_REPLACEMENT: [this.editStudy.KIT_REPLACEMENT,Validators.required], //kit number,inventory
        INVENTORY: [this.editStudy.INVENTORY,Validators.required],//bulk , discrete,bulk & discrete
        KIT_DESTRUCTION: [this.editStudy.KIT_DESTRUCTION, Validators.required], //yes,no
        DRUG_POOLING: [this.editStudy.DRUG_POOLING, Validators.required], //yes,no
    
        COHORT: [this.editStudy.COHORT, Validators.required], //yes no
    
        SCREENING_CAP: [this.editStudy.SCREENING_CAP, Validators.required], //number
        SCREENING_ALERT: [this.editStudy.SCREENING_ALERT, Validators.required],//number
        STUDY_CAP: [this.editStudy.STUDY_CAP, Validators.required],//number
        STUDY_CAP_ALERT: [this.editStudy.STUDY_CAP_ALERT, Validators.required],//number
      })
      this.submitButton='UPDATE'
    }
  this.initialValues = this.addOrEditStudy.value;
  console.log(this.studyDetails,this.editStudy)
}
saveStudies(){
  this.spinner.show()
  var orgObject=this.addOrEditStudy.value
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  orgObject.USERID=uid
  // orgObject.UID=uid
  orgObject.ORGID=this.globalID
  if(this.submitButton=='ADD'){
    orgObject.Action='ADD'
    console.log(orgObject)
    this.studService.addUpdateStudy(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success.STUDY[0]
        if(sucObj?.ID==3){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.addOrEditStudy.reset()
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
    orgObject.ID=this.editStudy.STUDY_ID
    console.log(orgObject)
    this.studService.addUpdateStudy(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success.STUDY[0]
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
  // this.addOrEditKit.removeValues()
  // this.ngOnInit()
  this.addOrEditStudy.reset(this.initialValues)
}

}
