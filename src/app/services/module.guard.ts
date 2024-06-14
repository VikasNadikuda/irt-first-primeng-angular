import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {StudyServiceService} from '../organization-module/services/study-service.service'
import { async, Observable } from 'rxjs';
import { MenuSettingsService } from '../_layout/settings/menu-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private studyService:StudyServiceService,
    private menu:MenuSettingsService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean> | boolean{
    var data=route.data
    console.log('data')
    if (this.authService.isLoggedIn()) { //remove not equal to
      const userObject= JSON.parse(localStorage.getItem('currentUser'));
      const uid=Number(userObject?.u_id)
      // const r_id=userObject?.r_id
      console.log(localStorage.getItem('r_id'))
      var rid=localStorage.getItem('r_id')
      var r_id
      if(rid!=null){
        r_id=localStorage.getItem('r_id')
      }
      const role=route.data?.role[0]
      console.log('auth',route,rid)
      let studies=[]
     if( r_id=='Master Admin' ){
        console.log('master')
        if( role=='Master Admin'){
        this.menu.menuChange()
        return true

        }
        else{
          this.router.navigate(['master/dashboard'])

        }

      }
      else if( r_id!='Master Admin' ){
        console.log('org',role,r_id,this.studyService.globalStudy)
        if( role=='Organization Admin' || role=='Study Admin'){
          return new Observable<boolean>(observer=>{
            if(this.studyService.globalStudy!=null){
              if(role!='Organization Admin' && this.studyService.globalStudy?.PROTOCAL_ID!=null){
                let code=data?.code[0]
                console.log(code)
                if(this.studyService.checkPerm(code) ){
                  observer.next(true)
                }
                else{
                  // observer.next(true)
                  this.toastr.error("",'You are not authorised to access this page',{
                    positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
                  });  
                  setTimeout(()=>{
                    this.router.navigate(['/studiesAndRoles'])
                  },1500)    
                  // console.log('hi1')
                  // this.router.navigate(['studiesAndRoles'])
                }
              }
              else{
                console.log('hi')
                observer.next(true)
                }
            }
            else{
              this.router.navigate(['studiesAndRoles'])

            }

          })
  
          // return new Observable<boolean>(observer=>{
          //   this.studyService.getStudies(uid).subscribe(
          //     async (success)=>{
          //       console.log(success)
          //         if(success.Table1!=undefined && success.Table1?.length!=0){
          //             studies=success.Table1
          //             await this.studyService.setStudy(studies)
          //             console.log(this.studyService.globalStudy?.PROTOCAL_ID)
          //             if(role!='Organization Admin' && this.studyService.globalStudy?.PROTOCAL_ID!=null){
          //               let code=data?.code[0]
                        
          //               if(this.studyService.checkPerm(code) ){
          //                 observer.next(true)
          //               }
          //               else{
          //                 // observer.next(true)
          //                 console.log('hi1')
          //                 this.router.navigate(['studiesAndRoles'])
          //               }
          //             }
          //             else{
          //               console.log('hi')
          //               this.router.navigate(['studiesAndRoles'])
          //             }
          //             // else{
          //             //   console.log('hi')
          //             //   this.router.navigate(['login'])
          //               // this.router.navigate(['studiesAndRoles'])

          //               // if(r_id==role){
          //               //   console.log('h1i')
          //               //   observer.next(true)
          //               // }
          //               // else{
          //               //   console.log('hi2')

          //               //   this.router.navigate(['studiesAndRoles'])
          //               //   // this.router.navigate(['login'])
          //               // }
          //             }
                        
          //             // }
          //         else{
          //           studies=[]
          //           this.studyService.setStudy(studies)
          //           this.router.navigate(['studiesAndRoles'])

          //         }

          //     }
          //   )
          // }
          // )
        }
        else if(role=='Studies'){
          return new Observable<boolean>(observer=>{
          if(this.studyService.globalStudy==null){
              this.studyService.getStudies(uid).subscribe(
                (success)=>{
                  console.log(success)
                    if(success.Table1!=undefined && success.Table1?.length!=0){
                        studies=success.Table1
                        let rid=this.studyService.setStudy(studies)
                    }
                    else{
                      studies=[]
                      this.studyService.setStudy(studies)
                    }
                    observer.next(true)
  
                }
              )
            
          }
          else{
            console.log('hi')
            observer.next(true)

          }
        }
        )

        }
        else{
          this.router.navigate(['/studiesAndRoles'])
          return true
        }

      }
      else{
        console.log('j')
        this.router.navigate(['login'])

      }
    }
     else{
      this.toastr.error("",'Please login again',{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });  
      setTimeout(()=>{
        this.router.navigate(['/login'])
      },1500)    
    }
    // else{
    //   console.log('l')
    //   return !this.authService.isLoggedIn();

    // }
  }
}
