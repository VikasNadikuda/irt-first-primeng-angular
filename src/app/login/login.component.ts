import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../_services/alert.service';
import {LoginService} from '../services/login.service'
import { HttpClient  } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {StudyServiceService} from '../organization-module/services/study-service.service'
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  year=new Date()
  loading = false;
  submitted = false;
  returnUrl: string;
  loginError:boolean=false;
  isPageLoaded = false;
  setPassFlag=false;
  loginInvalid=false;
  loginMessage:string
  passwordType: string='password';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public authService: AuthService,
    private renderer: Renderer2,
   private loginService:LoginService,
   private http:HttpClient,
   private toastr: ToastrService,
   private spinner: NgxSpinnerService,
    private studyService:StudyServiceService
  ) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });

  }

  ngOnInit() {
    this.toastr.clear();
    this.studyService.globalStudyDetails=null
    this.studyService.globalStudy=null   
    var code=history.state.code
    if(code!=null){
      this.toastr.success("",code,{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
    // localStorage.removeItem('currentUser')
    const emailFromsetPass= localStorage.getItem('emailIDPass')
    
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.maxLength(50),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
      rememberMe: false
    });
    if(emailFromsetPass!=null){
      this.loginForm.patchValue({
        email:JSON.parse(emailFromsetPass)
      })
    }
    // Remember Me
    if (localStorage.getItem('remember')) {
      this.renderer.removeClass(document.body, 'bg-full-screen-image');
      localStorage.removeItem('currentLayoutStyle');
      this.router.navigate(['/dashboard']);
    } else if (localStorage.getItem('currentUser')) {
      // Force logout on login if not remember me
      this.authService.logout();
      this.isPageLoaded = true;
    } else {
      this.isPageLoaded = true;
    }
    this.getIPAddress()

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  toggleLoginInput(){
    if(this.passwordType=='text'){
      this.passwordType='password'
    }
    else if(this.passwordType=='password'){
      this.passwordType='text'
    }
}
ipAddress
getIPAddress()
{
  this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
    this.ipAddress = res.ip;
  });
}
  tryLogin() {
   
    this.submitted = true;
    // setTimeout(()=>{
    //   this.toastr.clear();
    // },3000)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const value = {
      UserID: this.f.email.value,
      Password: this.f.password.value,
      IP:this.ipAddress
    };
    const setPassordUrl='setPassword'
    const returnUrl = '/master/dashboard';

    this.loginService.loginForm(value).subscribe(
          (success)=>{
            console.log(success)
            this.submitted = false 
              var obj=success['Login'][0]
              this.loginMessage=obj.Message
              console.log(obj)
              if(obj.ID=='4' || obj.ID=='5' ){  
                // this.loginError=true
                this.setPassFlag=true
                localStorage.setItem('emailID', JSON.stringify(value.UserID));
                this.router.navigate([setPassordUrl],{state:{code:this.loginMessage}})

              }
              else if(obj.ID=='2' || obj.ID=='3'){
                this.loginError=true
                this.toastr.warning("", this.loginMessage,{
                  positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
                });
              }
              else if(obj.ID=='1'){
                this.loginInvalid=true
                this.toastr.error("", 'Invalid User ID and Password',{
                  positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
                });
              }
              else{
                let user_obj=success
                const user={
                  name:user_obj.Table[0]['FIRST_NAME'] +' '+user_obj.Table[0]['LAST_NAME'],
                  mail_id:user_obj.Table1[0]['EMAIL'],
                  u_id:user_obj.Table[0]['ID']
                }
              
                if (this.loginForm.controls['rememberMe'] && this.loginForm.controls['rememberMe'].value) {
                  localStorage.setItem('remember', 'true');
                } else {
                  localStorage.removeItem('remember');
                }
                console.log(success)
                const emailFromsetPass= localStorage.getItem('emailIDPass')
                if(emailFromsetPass!=null){
                  localStorage.removeItem('emailIDPass')
                }
                var d=new Date()
                d.setMinutes(d.getMinutes() + user_obj.Table1[0]['SESSION_TIMEOUT']);

                localStorage.setItem('logTime',JSON.stringify(d))
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('JWT_TOKEN', user_obj.Login[0]['Token']);
                localStorage.setItem('r_id',user_obj.Table[0]['ROLE_ID']);
                // localStorage.setItem('r_id',user_obj.Table[0]['ROLE_ID']);

                if(user_obj.Table[0]['ROLE_ID']!='Master Admin'){
                  this.router.navigate(['/studiesAndRoles']);
                }
                else{
                  this.router.navigate([returnUrl]);

                }
              }
          },
          (error)=>{
            this.toastr.error("", error.message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
              this.submitted = false;
              console.log(error)
          }
      )
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
addCheckbox(event) {
  const toggle = document.getElementById('icheckbox');
  if (event.currentTarget.className === 'icheckbox_square-blue') {
     this.renderer.addClass(toggle, 'checked');
  } else if (event.currentTarget.className === 'icheckbox_square-blue checked') {
    this.renderer.removeClass(toggle, 'checked');
  }
}
  setUserInStorage(res) {
    if (res.user) {
      localStorage.setItem('currentUser', JSON.stringify(res.user));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(res));
    }

  }
  loginNow(){
    this.loginError=false
  }
  removeToast(){
    this.toastr.clear();
  }
}
