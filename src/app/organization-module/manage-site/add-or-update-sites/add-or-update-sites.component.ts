import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganisationsService } from "../../../services/organisations.service";
import {ToastrService  } from "ngx-toastr";
import {StudyServiceService} from '../../services/study-service.service'
import { UsersService } from 'src/app/services/users.service';
import {DepotService} from '../../services/depot.service'

@Component({
  selector: 'app-add-or-update-sites',
  templateUrl: './add-or-update-sites.component.html',
  styleUrls: ['./add-or-update-sites.component.css']
})
export class AddOrUpdateSitesComponent implements OnInit {
  @BlockUI('addSite') loader: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private userService:UsersService,
    private orgService:OrganisationsService,
    private studyService:StudyServiceService,
    private depotService:DepotService


  ) { }
  public breadcrumb: any;
  title='Add Site'
  addOrEditSite: FormGroup;
  countries =[];
  states=[]
  cities=[]
  submitButton='ADD'
  showLoading:boolean=true
  editDepot
  list_names=[]
  list_ids=[]
  inhouse_types=
    [
      {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
      {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'}

  ]
  shipping_depots=[]
  destruction_depots=[]
  timeZones=[]
  initialValues
  globalID
  ngOnInit(): void {
    this.spinner.show()
    this.editDepot=history.state.siteDetails
    this.globalID=this.studyService.globalStudy?.ORG_ID
    console.log(this.editDepot)
    if(this.editDepot==undefined){
      this.addOrEditSite = this.formBuilder.group({
        site_id: ['', [Validators.required,Validators.maxLength(30)]],
        siteName: ['', [Validators.required,Validators.maxLength(100)]],
        address: ['', [Validators.required,Validators.maxLength(150)]],
        Description: ['', [Validators.required,Validators.maxLength(500)]],
        ShipmentDepot: [null],
        SIDF:[null,Validators.required],
        SDF: [null],
        timezone: [null, Validators.required],
        firstName: ['', [Validators.required,Validators.maxLength(15)]],
        lastname: ['', [Validators.required,Validators.maxLength(15)]],
        address1: ['', [Validators.required,Validators.maxLength(100)]],
        address2: ['', [Validators.required,Validators.maxLength(100)]],
        city: ['', [Validators.required,Validators.maxLength(30)]],
        state: ['', [Validators.required,Validators.maxLength(30)]],
        country: [null, Validators.required],
        phno:['',[Validators.required,Validators.maxLength(15)]],
        zipCode: ['',[Validators.required,Validators.maxLength(30)]],
        emailId: ['',[Validators.required,Validators.maxLength(50),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      });
    }
    else if(this.editDepot!=undefined){
      this.title='Edit Site'
      this.submitButton='UPDATE'
      this.addOrEditSite = this.formBuilder.group({
        site_id: [this.editDepot.SITE_ID, [Validators.required,Validators.maxLength(30)]],
        siteName: [this.editDepot.SITE_NAME, [Validators.required,Validators.maxLength(100)]],
        address: [this.editDepot.SITE_ADDRESS, [Validators.required,Validators.maxLength(150)]],
        Description: [this.editDepot.DESCRIPTION, [Validators.required,Validators.maxLength(500)]],
        ShipmentDepot: [this.editDepot.SHIPMENT_DEPOT],
        SIDF:[this.editDepot.INHOUSE_DESTRUCTION_FACILITY,Validators.required],
        SDF: [this.editDepot.DESTRUCTION_FACILITY],
        timezone: [this.editDepot.TIMEZONE, Validators.required],
        firstName: [this.editDepot.CFNAME, [Validators.required,Validators.maxLength(15)]],
        lastname: [this.editDepot.CLNAME, [Validators.required,Validators.maxLength(15)]],
        address1: [this.editDepot.CADDRESS1, [Validators.required,Validators.maxLength(100)]],
        address2: [this.editDepot.CADDRESS2, [Validators.required,Validators.maxLength(100)]],
        city: [this.editDepot.CCITY, [Validators.required,Validators.maxLength(30)]],
        state: [this.editDepot.CSTATE, [Validators.required,Validators.maxLength(30)]],
        country: [this.editDepot.COUNTRY_ID, Validators.required],
        phno: [this.editDepot.CPHONE,[Validators.required,Validators.maxLength(15)]],
        zipCode: [this.editDepot.CZIPCODE,[Validators.required,Validators.maxLength(30)]],
        emailId: [this.editDepot.CEMAIL,[Validators.required,Validators.maxLength(50),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      });


    }
    this.initialValues = this.addOrEditSite.value;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Sites',
          'isLink': true,
          'link': '/organisation/manageSite'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
        },
      ]
    };
    this.getDetails()
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  getDetails(){
    this.depotService.getDetails(this.globalID).subscribe(
      (success)=>{
          // if(success.Table1!=undefined && success.Table1?.length!=0){
            this.shipping_depots=success?.Table
            this.destruction_depots=success?.Table1
            console.log(success)
            this.countries=success.Table2
            this.getTimeZone()
            // if(this.editDepot!=undefined){
            //   this.countryChanged(this.editDepot.Country)
            // }
            // else{
            //   this.spinner.hide()
            // }
          // }
          // else{
          //   this.countries=[]
          //   this.spinner.hide()

          // }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.countries=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  getTimeZone(){
    this.userService.getTimezone().subscribe(
      (success)=>{
        console.log(success)
        if(success!=undefined && success?.length!=0){
          this.timeZones=success
            this.spinner.hide()
        }
        else{
          this.timeZones=[]
            this.spinner.hide()
        }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.timeZones=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  countryChanged(country){
    // this.spinner.show()
    const obj={
      "CId": country,
      "Type":"STATE"
         
   }
    this.orgService.getState(obj).subscribe(
      (success)=>{
        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.states=success.Table1
          if(this.editDepot!=undefined){
            this.stateChanged(this.editDepot.State)
          }
          else{
            // this.spinner.hide()
          }
        }
        else{
          this.states=[]
          // this.spinner.hide()

        }
      },
      (error)=>{
        // this.spinner.hide()
        this.states=[]
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    ) 
  }
  stateChanged(state){
    this.spinner.show()
    const obj={
      "CId": state,
      "Type":"CITY"
         
   }
    this.orgService.getCity(obj).subscribe(
      (success)=>{
        this.spinner.hide()
        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.cities=success.Table1
        }
        else{
          this.cities=[]
        }
      },
      (error)=>{
        this.spinner.hide()
        this.cities=[]
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    ) 

  }
  saveSite(){
    this.spinner.show()
    var orgObject=this.addOrEditSite.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.UserID=uid
    // orgObject.UID=uid
    orgObject.OrgID=this.globalID
    orgObject.depot='0'
    if(this.submitButton=='ADD'){
      orgObject.Action='ADD'
      this.depotService.addUpdateDepot(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Site[0]
          if(sucObj?.ID==3){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.addOrEditSite.reset()
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
          // this.addOrEditSite.reset()
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
      orgObject.SID=this.editDepot.ID
      console.log(orgObject)
      this.depotService.addUpdateDepot(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Site[0]
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
    // this.addOrEditSite.removeValues()
    // this.ngOnInit()
    this.addOrEditSite.reset(this.initialValues)
  }
  number(){
    console.log(this.addOrEditSite.controls.PRODTYPEVALUE)
    // console.log(this.addOrEditSite.controls.NAMEDUSERSVALUE)
    console.log(this.addOrEditSite.controls.PRODTYPEVALUE.hasError('required'))
    console.log(this.addOrEditSite.controls.PRODTYPEVALUE.hasError('min'))
  }
}
