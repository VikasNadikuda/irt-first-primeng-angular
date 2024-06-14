import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {StudyServiceService} from '../organization-module/services/study-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private studyService:StudyServiceService
    ) { }

  canActivate() {
    if (this.authService.isLoggedIn()) { 
      //remove not equal to
      console.log('auth1')
      let n=new Date(JSON.parse(localStorage.getItem('logTime')))
      // var refreshIntervalId= setInterval(()=>{
      //   let v=new Date()
      //   if(v>n){
      //     this.toastr.error("",'Session Timed out .Please login again',{
      //       positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      //     });  
      //     setTimeout(()=>{
      //       /* later */
      //       clearInterval(refreshIntervalId);
      //       this.toastr.clear()

      //       this.router.navigate(['/login'])

      //     },2000)
      //     // alert('logged out')
      //   }
      // },1000)
      return true
    }
     else{
      this.toastr.error("",'Please login again',{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });  
      setTimeout(()=>{
        this.toastr.clear()

        this.router.navigate(['/login'])
        
      },1500)    

    }
    // return !this.authService.isLoggedIn();
  }
}