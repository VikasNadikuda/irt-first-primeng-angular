import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService  } from "ngx-toastr";
import { OrganisationsService } from "../../../services/organisations.service";
import {UsersService} from '../../../services/users.service'
import {StudyServiceService} from '../../services/study-service.service'

@Component({
  selector: 'app-add-or-update-users',
  templateUrl: './add-or-update-users.component.html',
  styleUrls: ['./add-or-update-users.component.css']
})
export class AddOrUpdateUsersComponent implements OnInit {
  @BlockUI('addUser') loader: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private userService:UsersService,
    private orgService:OrganisationsService,
    private studyService:StudyServiceService

  ) { }
  public breadcrumb: any;
  title='Add User'
  addOrEditUser: FormGroup;
  submitButton='ADD'
  editUser
  timeZones=[]
  status=[
    {LIBRARY_VALUE: 'Active', LIBRARY_ID: 'Active'},
    {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 'Inactive'},]
    roles=[]
      countries=[]
  orgNames=[]
  globalID
  initialValues
  ngOnInit(): void {
    this.loader.start()
    this.editUser=history.state.userDetails
    // console.log(this.editUser)
    this.globalID=this.studyService.globalStudy?.ORG_ID
    if(this.editUser==undefined){
      this.addOrEditUser = this.formBuilder.group({
        firstname: ['', [Validators.required,Validators.maxLength(15)]],
        lastname: ['', [Validators.required,Validators.maxLength(15)]],
        address1: ['', [Validators.required,Validators.maxLength(150)]],
        contact: ['', [Validators.required,Validators.maxLength(25)]],
        country: [null, Validators.required],
        email: ['',[Validators.required,Validators.maxLength(50),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        company: ['',[Validators.required,Validators.maxLength(50)]],
        role: [null, Validators.required],
        ORGANIZATIONNAME: [null],
        timezone: [null, Validators.required],
        status: [null, Validators.required],
  
      });
    }
    if(this.editUser!=undefined){
      this.title='Edit User Information'
      this.submitButton='UPDATE'
      this.addOrEditUser = this.formBuilder.group({
        firstname: [this.editUser.First_Name, [Validators.required,Validators.maxLength(15)]],
        lastname: [this.editUser.Last_Name, [Validators.required,Validators.maxLength(15)]],
        address1: [this.editUser.Address, [Validators.required,Validators.maxLength(150)]],
        contact: [this.editUser.Phone_Number, [Validators.required,Validators.maxLength(25)]],
        country: [this.editUser.Country_ID, Validators.required],
        email: [this.editUser.Email_Address,[Validators.required,Validators.maxLength(50),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        company: [this.editUser.Company,[Validators.required,Validators.maxLength(50)]],
        role: [this.editUser.Role_Name, Validators.required],
        ORGANIZATIONNAME: [this.editUser.Organization],
        timezone: [this.editUser.Timezone, Validators.required],
        status: [this.editUser.Status, Validators.required],
      });

    }
    this.initialValues = this.addOrEditUser.value;

      this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Users',
          'isLink': true,
          'link': '/organisation/manageUsers'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
    console.log(this.globalID)
    this.getCountries()
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  resetForm(){
    this.addOrEditUser.reset(this.initialValues)

  }
  getOrganisations(){
    this.orgService.getOrgans().subscribe(
      (success)=>{
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.orgNames=success.Table1
            this.getCountries()
          }
          else{
            this.orgNames=[]
            this.getCountries()

          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.orgNames=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  getCountries(){
    this.orgService.getCountry().subscribe(
      (success)=>{
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.countries=success.Table1
            // this.loader.stop()
            this.getTimeZone()
          }
          else{
            this.countries=[]
            this.getTimeZone()

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
  getTimeZone(){
    this.userService.getTimezone().subscribe(
      (success)=>{
        if(success!=undefined && success?.length!=0){
          this.timeZones=success
          this.getRoles()
        }
        else{
          this.timeZones=[]
          this.getRoles()
        }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.timeZones=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  getRoles(){
    this.orgService.getOrgRoles().subscribe(
      (success)=>{
        if(success!=undefined && success?.length!=0){
          this.roles=success?.Table1
          console.log(success)
          this.loader.stop()
        }
        else{
          this.roles=[]
          this.loader.stop()
        }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.timeZones=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  saveUser(){
    this.spinner.show()
    var userObj=this.addOrEditUser.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    userObj.UID=uid
    userObj.ORGANIZATIONID=this.globalID
    console.log(userObj)
    if(this.submitButton=='ADD'){
      userObj.Type='ADD'
      this.userService.saveEditUser(userObj).subscribe(
        (success)=>{
          this.spinner.hide()
          var sucObj=success?.User[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.addOrEditUser.reset()

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
          // this.addOrEditUser.reset()
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
      userObj.Type='UPDATE'
      userObj.ID=this.editUser.Id
      userObj.oldrole=this.editUser.Role_Name
      console.log(userObj,this.editUser)
      this.userService.saveEditUser(userObj).subscribe(
        (success)=>{
          var sucObj=success?.User[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
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
          this.spinner.hide()

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
