import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../validators/custom-validators';
import {LoginService} from '../../services/login.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  setPasswordForm: FormGroup;
  passwordType1:string='password'
  passwordType2:string='password'
  passwordType3:string='password'
  passwordSubmitted=false
  changeError=false
  successfull=false
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService:LoginService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.setPasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword:[null, Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          )])],
      confirmPassword:['', Validators.required]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    });
  }
  
  get passwordControls() {
    return this.setPasswordForm.controls;
  }
  toggleLoginInput1(){
    if(this.passwordType1=='text'){
      this.passwordType1='password'
    }
    else if(this.passwordType1=='password'){
      this.passwordType1='text'
    }
}

 //password see/hide function for modal new password
 toggleLoginInput2(){
    if(this.passwordType2=='text'){
      this.passwordType2='password'
    }
    else if(this.passwordType2=='password'){
      this.passwordType2='text'
    }
}
 //password see/hide function for modal new password
toggleLoginInput3(){
    if(this.passwordType3=='text'){
      this.passwordType3='password'
    }
    else if(this.passwordType3=='password'){
      this.passwordType3='text'
    }
}
setMessage:string
setPassword(){
  this.passwordSubmitted=true
  this.toastr.clear();

  var email=JSON.parse(localStorage.getItem('emailID'))
  const value = {
    UserID: email,
    Password: this.passwordControls.newPassword.value,
    OldPassword: this.passwordControls.oldPassword.value,
  };
  if(this.passwordControls.newPassword.value!=this.passwordControls.oldPassword.value){
    this.loginService.setPassword(value).subscribe(
      (success)=>{
        this.setMessage=success
        if(this.setMessage=='Password updated successfully'){
          localStorage.removeItem('emailID')
          localStorage.setItem('emailIDPass',JSON.stringify(email))
          this.toastr.success("", this.setMessage,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.successfull=true
          this.router.navigate(['/login'])
        }
        else{
          this.toastr.error("", this.setMessage,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.changeError=true
        }
      },
      (error)=>{
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
        console.log(error)
        this.changeError=true
      }
    )
  }
  else{
    this.toastr.error("", 'New password cannot be same as old Password',{
      positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
    });
  }
}
removeToast(){
  this.toastr.clear();
}
}
