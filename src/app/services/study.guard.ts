import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {StudyServiceService} from '../organization-module/services/study-service.service'
import { Observable } from 'rxjs';
import { MenuSharedService } from './menu-shared.service';
import { MenuSettingsService } from '../_layout/settings/menu-settings.service';

@Injectable({
  providedIn: 'root'
})
export class StudyGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private studyService:StudyServiceService,
    private menuService:MenuSettingsService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean> | boolean{
    let routes=this.menuService.validRoutes
    console.log(routes)
    if(routes.indexOf(state)>-1){
      return true
    }
    else{
      this.toastr.error("",'You are not authorised to view this page',{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });  
      setTimeout(()=>{
        this.toastr.clear()

        this.router.navigate(['/studiesAndRoles'])
        
      },1500)    

    }
}
}