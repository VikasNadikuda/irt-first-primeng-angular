import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService  } from "ngx-toastr";
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import {StudyKitService} from '../../services/study-kit.service';
import {StudyRoleService} from '../../services/study-role.service'
@Component({
  selector: 'app-add-update-kit-types',
  templateUrl: './add-update-kit-types.component.html',
  styleUrls: ['./add-update-kit-types.component.css']
})
export class AddUpdateKitTypesComponent implements OnInit {
  @BlockUI('addKitType') loader: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    public kitService:StudyKitService,
    public studyService:StudyServiceService
  ) { }
  title='Add Kit Type'
  breadcrumb: any;
  addOrEditKit: FormGroup;
  countries =[];
  states=[]
  cities=[]
  submitButton='ADD'
  showLoading:boolean=true
  editKit
  list_names=[]
  list_ids=[]
  initialValues
  globalID
  replacement_types=
  [
    {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
    {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'}

]
inventory_types_initial=[
  {LIBRARY_VALUE: 'Bulk', LIBRARY_ID: 'Bulk'},
  {LIBRARY_VALUE: 'Discrete', LIBRARY_ID: 'Discrete'},
  {LIBRARY_VALUE: 'Bulk & Discrete', LIBRARY_ID: 'Bulk & Discrete'}
]
inventory_types=[]
  ngOnInit(): void {
    this.editKit=history.state.kitDetails
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    console.log(this.studyService.globalStudyDetails,this.editKit)
    if(this.studyService.globalStudyDetails?.INVENTORY=='Bulk'){
      this.inventory_types=[
        {LIBRARY_VALUE: 'Bulk', LIBRARY_ID: 'Bulk'},

      ]
    }
    else if(this.studyService.globalStudyDetails?.INVENTORY=='Discrete'){
      this.inventory_types=[
        {LIBRARY_VALUE: 'Discrete', LIBRARY_ID: 'Discrete'},

      ]
    }
    else{
      this.inventory_types=[
        {LIBRARY_VALUE: 'Bulk', LIBRARY_ID: 'Bulk'},
        {LIBRARY_VALUE: 'Discrete', LIBRARY_ID: 'Discrete'}
      ]
    }
    if(this.editKit==undefined){
      this.addOrEditKit = this.formBuilder.group({
        KitTypeName: [null, [Validators.required,Validators.maxLength(100)]],
        KitTypeId: [null, [Validators.required,Validators.maxLength(100)]],
        Inventory_Type: [null,Validators.required],
        Category: [null, [Validators.required,Validators.maxLength(50)]],
        Regular_Replace: [null, Validators.required]

      });
    }
    else if(this.editKit!=undefined){
      this.title='Edit Kit Type'
      this.submitButton='UPDATE'
      this.addOrEditKit = this.formBuilder.group({
        KitTypeName: [this.editKit.KIT_TYPE, [Validators.required,Validators.maxLength(100)]],
        KitTypeId: [this.editKit.KIT_TYPE_ID, [Validators.required,Validators.maxLength(100)]],
        Inventory_Type: [this.editKit.INVENTORY_TYPE, [Validators.required,Validators.maxLength(50)]],
        Category: [this.editKit.CATEGORY, [Validators.required,Validators.maxLength(50)]],
        Regular_Replace: [this.editKit.REGULAR_REPLACEMENT, Validators.required]
      });


    }
    this.initialValues = this.addOrEditKit.value;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Kit Types',
          'isLink': true,
          'link': '/study/manageKitTypes'
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
  saveKitType(){
    this.spinner.show()
    var orgObject=this.addOrEditKit.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.UserID=uid
    // orgObject.UID=uid
    orgObject.OrgID=this.globalID

    if(this.submitButton=='ADD'){
      orgObject.Action='ADD'
      console.log(orgObject)

      this.kitService.addUpdateKitType(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success?.KitType[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            // this.submitButton='UPDATE'
            this.addOrEditKit.reset()

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
      orgObject.ID=this.editKit.ID
      console.log(orgObject)
      this.kitService.addUpdateKitType(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success?.KitType[0]
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
    this.addOrEditKit.reset(this.initialValues)
  }
}
