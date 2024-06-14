import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SettingsService} from '../../services/settings.service'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @BlockUI('viewSettings') loader: NgBlockUI;
  edit=false
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private settingsService:SettingsService
  ) { }
  configureSettings:FormGroup
  ngOnInit(): void {
    this.loader.start()
    this.configureSettings = this.formBuilder.group({
      AdminEmail: ['',[Validators.required,Validators.maxLength(50),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      LockDays: ['',[Validators.required,Validators.pattern("^-?[0-9]+([0-9]+)*$")]],
      PasswordDays: ['', [Validators.required,Validators.pattern("^-?[0-9]+([0-9]+)*$")]],
      Session: ['', [Validators.required,Validators.pattern("^-?[0-9]+([0-9]+)*$")]],
    })    
    this.settingsService.getSettings().subscribe(
      (success)=>{
        this.loader.stop()

        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.edit=true
          var settings=success.Table1[0]
          console.log(settings)

          this.configureSettings.patchValue({
            AdminEmail: settings.EMAIL,
            LockDays:settings.LOGIN_ATTEMPTS,
            PasswordDays: settings.CHANGE_PASS_DAYS,
            Session: settings.SESSION_TIMEOUT, 
          })
      }

      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  
  saveSettings(){
    this.spinner.show()
    var settObj=this.configureSettings.value
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    settObj.UserID=uid
    if(!this.edit){
      settObj.Action='ADD'
      this.settingsService.addUpdateSettings(settObj).subscribe(
        (success)=>{
          this.spinner.hide()
          console.log(success)
          var sucObj=success.Settings[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            // this.submitButton='UPDATE'
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else {
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          this.configureSettings.reset()
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
    else if(this.edit){
      settObj.Action='UPDATE'
      this.settingsService.addUpdateSettings(settObj).subscribe(
        (success)=>{
          this.spinner.hide()
          var sucObj=success.Settings[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            // this.submitButton='UPDATE'
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else {
            this.toastr.warning("", sucObj.Message,{
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
