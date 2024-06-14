import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { Organisation,Place } from '../view-organisations/organisation';
import { OrganisationsService } from "../../../services/organisations.service";
import {ToastrService  } from "ngx-toastr";
@Component({
  selector: 'app-add-or-update-organisation',
  templateUrl: './add-or-update-organisation.component.html',
  styleUrls: ['./add-or-update-organisation.component.css']
})
export class AddOrUpdateOrganisationComponent implements OnInit {
  @BlockUI('addOrg') loader: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private orgService:OrganisationsService

  ) { }
  public breadcrumb: any;
  title='Add Organisation'
  addOrEditOrg: FormGroup;
  countries :Place[];
  states:Place[]
  cities:Place[]
  submitButton='ADD'
  status=[
    {LIBRARY_VALUE: 'Active', LIBRARY_ID: 1},
    {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 0},]
  showLoading:boolean=true
  editOrganisation:Organisation
  list_names=[]
  list_ids=[]
  initialValues
  ngOnInit(): void {
    this.loader.start()
    this.editOrganisation=history.state.organisation
    this.list_names=history.state.list1
    this.list_ids=history.state.list2
    console.log(this.list_ids,this.list_names)
    if(this.editOrganisation==undefined){
      this.addOrEditOrg = this.formBuilder.group({
        ORGANIZATIONID: ['', [Validators.required,Validators.maxLength(30)]],
        ORGANIZATIONNAME: ['', [Validators.required,Validators.maxLength(100)]],
        address1: ['', [Validators.required,Validators.maxLength(150)]],
        address2: ['', [Validators.required,Validators.maxLength(150)]],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required],
        contact:['',[Validators.required,Validators.maxLength(25)]],
        NAMEDUSERS: ['Unlimited', Validators.required],
        zip: ['',[Validators.required,Validators.maxLength(10)]],
        NAMEDUSERSVALUE: [null,[Validators.min(1),Validators.pattern("^-?[0-9]+([0-9]+)*$")]],
        PRODTYPE: ['Unlimited', Validators.required],
        PRODTYPEVALUE: [null,[Validators.min(1),Validators.pattern("^-?[0-9]+([0-9]+)*$")]],
        STATUS: [null, Validators.required],
  
      });
    }
    if(this.editOrganisation!=undefined){
      this.title='Edit Organisation'
      this.submitButton='UPDATE'
      this.addOrEditOrg = this.formBuilder.group({
        ORGANIZATIONID: [this.editOrganisation.Organization_ID, [Validators.required,Validators.maxLength(30)]],
        ORGANIZATIONNAME: [this.editOrganisation.Organization_Name, [Validators.required,Validators.maxLength(100)]],
        address1: [this.editOrganisation.Address1, [Validators.required,Validators.maxLength(150)]],
        address2: [this.editOrganisation.Address2, [Validators.required,Validators.maxLength(150)]],
        city: [this.editOrganisation.City, Validators.required],
        state: [this.editOrganisation.State, Validators.required],
        country: [this.editOrganisation.Country, Validators.required],
        contact: [this.editOrganisation.Contact, Validators.required],
        NAMEDUSERS: [this.editOrganisation.Named_Users, Validators.required],
        zip: [this.editOrganisation.Zip,[Validators.required,Validators.maxLength(10)]],
        NAMEDUSERSVALUE: [this.editOrganisation.Named_Users_Value],
        PRODTYPE: [this.editOrganisation.Prodtype, Validators.required],
        PRODTYPEVALUE: [this.editOrganisation.Prodtypevalue],
        STATUS: [this.editOrganisation.Status, Validators.required],
      });


    }
    this.initialValues = this.addOrEditOrg.value;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Organisations',
          'isLink': true,
          'link': '/master/manageOrganisation'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
        },
      ]
    };
    this.getCountries()
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  getCountries(){
    this.orgService.getCountry().subscribe(
      (success)=>{
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.countries=success.Table1
            if(this.editOrganisation!=undefined){
              this.countryChanged(this.editOrganisation.Country)
            }
            else{
              this.loader.stop()
            }
          }
          else{
            this.countries=[]
            this.loader.stop()

          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.countries=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  countryChanged(country){
    // this.loader.start()
    const obj={
      "CId": country,
      "Type":"STATE"
         
   }
    this.orgService.getState(obj).subscribe(
      (success)=>{
        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.states=success.Table1
          if(this.editOrganisation!=undefined){
            this.stateChanged(this.editOrganisation.State)
          }
          else{
            this.loader.stop()
          }
        }
        else{
          this.states=[]
          this.loader.stop()

        }
      },
      (error)=>{
        // this.loader.stop()
        this.states=[]
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    ) 
  }
  stateChanged(state){
    // this.loader.start()
    const obj={
      "CId": state,
      "Type":"CITY"
         
   }
    this.orgService.getCity(obj).subscribe(
      (success)=>{
        this.loader.stop()
        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.cities=success.Table1
        }
        else{
          this.cities=[]
        }
      },
      (error)=>{
        this.loader.stop()
        this.cities=[]
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    ) 

  }
  saveOrganisation(){
    this.spinner.show()
    var orgObject=this.addOrEditOrg.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.UID=uid
    if(this.submitButton=='ADD'){
      orgObject.Type='ADD'
      this.orgService.saveOrganisations(orgObject).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Org[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.addOrEditOrg.reset()

            this.submitButton='UPDATE'
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 || sucObj?.ID==0 ){
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
       
          console.log(success)
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
      orgObject.Type='UPDATE'
      orgObject.ID=this.editOrganisation.Id
      this.orgService.saveOrganisations(orgObject).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Org[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            // this.addOrEditOrg.reset()
            this.submitButton='UPDATE'
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 || sucObj?.ID==0 ){
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
    // this.addOrEditOrg.removeValues()
    // this.ngOnInit()
    this.addOrEditOrg.reset(this.initialValues)
  }
  number(){
    console.log(this.addOrEditOrg.controls.PRODTYPEVALUE)
    // console.log(this.addOrEditOrg.controls.NAMEDUSERSVALUE)
    console.log(this.addOrEditOrg.controls.PRODTYPEVALUE.hasError('required'))
    console.log(this.addOrEditOrg.controls.PRODTYPEVALUE.hasError('min'))
  }
}
