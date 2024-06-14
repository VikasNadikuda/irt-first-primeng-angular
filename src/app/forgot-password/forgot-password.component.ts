import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../services/login.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  sendPasswordForm: FormGroup;
  Message:string="password Changed Success"
  constructor(
    private formBuilder: FormBuilder,
    private loginService:LoginService,
    private toastr: ToastrService,
    private router:Router

  ) { }
  submitted:boolean = false;
  ngOnInit(): void {
    this.toastr.clear();
    this.sendPasswordForm = this.formBuilder.group({
      email: [null,[ Validators.required,Validators.maxLength(50),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  sendPassword(){
    this.submitted=true
    const value={
      UserID:this.sendPasswordForm.controls.email.value
    }
    this.loginService.sendPassword(value).subscribe(
      (success)=>{
        this.submitted=false
        let sucObj=success.Login[0]
          if(sucObj?.ID==3){
            this.router.navigate(['/login'],{state:{code:sucObj?.Message}})
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
        // if(success=="User Email doesn't exist. Please Contact Administrator."){
        //   this.toastr.error("", success,{
        //     positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        //   });
        // }
        // else if(success=="Your  account is currently inactive. Please contact Administrator for assistance."){
        //   this.toastr.warning("", success,{
        //     positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        //   });
        // }
        // else if(success=="Password Sent to Your Registered E-mail Address."){
        //   this.toastr.success("", success+'please Login now',{
        //     positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        //   });
        //   this.sendPasswordForm.reset();
        //   this.router.navigate(['/login'],{state:{code:success+'please Login now'}})
        // }

      },
      (error)=>{
        this.submitted=false
        console.log(error)
        this.toastr.error("", error.Message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )

  }
  removeToast(){
    this.toastr.clear();
  }
}
