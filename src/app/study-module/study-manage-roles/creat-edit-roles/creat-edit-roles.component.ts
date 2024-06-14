import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService  } from "ngx-toastr";
import {StudyKitService} from '../../services/study-kit.service';
import {StudyRoleService} from '../../services/study-role.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';

@Component({
  selector: 'app-creat-edit-roles',
  templateUrl: './creat-edit-roles.component.html',
  styleUrls: ['./creat-edit-roles.component.css']
})
export class CreatEditRolesComponent implements OnInit {
  @BlockUI('addRole') loader: NgBlockUI;
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true ,maxScrollbarLength:240};

  @ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    public kitService:StudyKitService,
    public studyService:StudyServiceService,
    public roleService:StudyRoleService
      ) { }
  title='Add Role'
  breadcrumb: any;
  addOrEditRole: FormGroup;
  countries =[];
  states=[]
  cities=[]
  submitButton='ADD'
  showLoading:boolean=true
  editRole
  list_names=[]
  list_ids=[]
  initialValues
  globalID


  dashboard_cat= []
  study_roles=[]
  data_changes=[]
  depots=[]
  sites=[]
  supplies=[]
  subjects=[]
  sub_acc=[]
  reports=[]
  ngOnInit(): void {
    this.editRole=history.state.roleDetails
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    console.log(this.editRole)
    if(this.editRole==undefined){
      this.addOrEditRole = this.formBuilder.group({
        RoleName: [null, [Validators.required,Validators.maxLength(50)]],

      });
      this.roleService.getAllRoles().subscribe(
        (success)=>{
          this.loader.stop()
          console.log(success)
          let all_roles=success?.Table1
          this.study_roles=all_roles.filter(function (el) {
            return el.MODULE_NAME=='Study'
          })
          this.study_roles.forEach(element => {
            element.selected=false
          });
        },
        (error)=>{
          this.loader.stop()
          console.log(error)
          // this.roles=[]
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
    }
    else if(this.editRole!=undefined){
      this.title='Edit Role'
      this.submitButton='UPDATE'
      this.addOrEditRole = this.formBuilder.group({
        RoleName: [this.editRole.ROLE_NAME, [Validators.required,Validators.maxLength(50)]],

      });
      this.roleService.getAllRoles().subscribe(
        (success)=>{
          this.loader.stop()
          console.log(success)
          let all_roles=success?.Table1
          this.study_roles=all_roles.filter(function (el) {
            return el.MODULE_NAME=='Study'
          })
          var p=this.editRole?.PERMISSION
          console.log(p)
          this.study_roles.forEach(function (value, i) {
              if(p[i]=='1'){
                value.selected=true
              }
              else{
                value.selected=false

              }
          });
          this.isAllSelected(2)

        },
        (error)=>{
          this.loader.stop()
          console.log(error)
          // this.roles=[]
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )

    }
    this.initialValues = this.addOrEditRole.value;

    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Roles',
          'isLink': true,
          'link': '/study/manageRoles'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
        },
      ]
    };
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  saveRoles(){

  }
  dash
  dash1=[]
  isMasterSelDash:boolean;
  isMasterSelStudy:boolean;
  isMasterSelData:boolean;
  isMasterSelDepot:boolean;
  isMasterSelSite:boolean;
  isMasterSelSupplies:boolean;
  isMasterSelSubject:boolean;
  isMasterSelSubjectAcc:boolean;
  isMasterSelReport:boolean;
  categoryList:any=[]
  checkedCategoryList:any=[]
  resetForm(){
    // this.addOrEditKit.removeValues()
    // this.ngOnInit()
    this.addOrEditRole.reset(this.initialValues)
  }
  selectAllDash(code) {
    if(code==1){
      for (var i = 0; i < this.dashboard_cat.length; i++) {
        this.dashboard_cat[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==2){
      for (var i = 0; i < this.study_roles.length; i++) {
        this.study_roles[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==3){
      for (var i = 0; i < this.data_changes.length; i++) {
        this.data_changes[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==4){
      for (var i = 0; i < this.depots.length; i++) {
        this.depots[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==5){
      for (var i = 0; i < this.sites.length; i++) {
        this.sites[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==6){
      for (var i = 0; i < this.supplies.length; i++) {
        this.supplies[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==7){
      for (var i = 0; i < this.subjects.length; i++) {
        this.subjects[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==8){
      for (var i = 0; i < this.sub_acc.length; i++) {
        this.sub_acc[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }
    if(code==9){
      for (var i = 0; i < this.reports.length; i++) {
        this.reports[i].selected = this.isMasterSelStudy;
      }
      // this.getCheckedItemList(code);
    }

  }
   
  isAllSelected(code) {
    if(code==1){
      this.isMasterSelDash = this.dashboard_cat.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==2){
      this.isMasterSelStudy = this.study_roles.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==3){
      this.isMasterSelData = this.data_changes.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==4){
      this.isMasterSelDepot = this.depots.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==5){
      this.isMasterSelSite = this.sites.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==6){
      this.isMasterSelSupplies = this.supplies.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==7){
      this.isMasterSelSubject = this.subjects.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==8){
      this.isMasterSelSubjectAcc = this.sub_acc.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }
    if(code==9){
      this.isMasterSelReport = this.reports.every(function(item:any) {
        return item.selected == true;
      })
      // this.getCheckedItemList(code);
    }


  }
  
  getCheckedItemList(code){
    this.checkedCategoryList = [];
    if(code==1){
      for (var i = 0; i < this.dashboard_cat.length; i++) {
        if(this.dashboard_cat[i].selected)
        this.checkedCategoryList.push(this.dashboard_cat[i]);
      }
    }
    if(code==2){
      for (var i = 0; i < this.study_roles.length; i++) {
        if(this.study_roles[i].selected)
        this.checkedCategoryList.push(this.study_roles[i]);
      }
    }
    if(code==3){
      for (var i = 0; i < this.data_changes.length; i++) {
        if(this.data_changes[i].selected)
        this.checkedCategoryList.push(this.data_changes[i]);
      }
    }
    if(code==4){
      for (var i = 0; i < this.depots.length; i++) {
        if(this.depots[i].selected)
        this.checkedCategoryList.push(this.depots[i]);
      }
    }
    if(code==5){
      for (var i = 0; i < this.sites.length; i++) {
        if(this.sites[i].selected)
        this.checkedCategoryList.push(this.sites[i]);
      }
    }
    if(code==6){
      for (var i = 0; i < this.supplies.length; i++) {
        if(this.supplies[i].selected)
        this.checkedCategoryList.push(this.supplies[i]);
      }
    }
    if(code==7){
      for (var i = 0; i < this.subjects.length; i++) {
        if(this.subjects[i].selected)
        this.checkedCategoryList.push(this.subjects[i]);
      }
    }
    if(code==8){
      for (var i = 0; i < this.sub_acc.length; i++) {
        if(this.sub_acc[i].selected)
        this.checkedCategoryList.push(this.sub_acc[i]);
      }
    }
    if(code==9){
      for (var i = 0; i < this.reports.length; i++) {
        if(this.reports[i].selected)
        this.checkedCategoryList.push(this.reports[i]);
      }
    }
 
    console.log(this.checkedCategoryList)
  }
  // selectAllDash(){
  //   if(this.dash){
  //     this.dash1=this.dashboard_cat
  //   }
  //   else{
  //     this.dash1=[]
  //   }
  //   console.log(this.dash)
  // }
  checkIfthere(){

  }
  saveUpdateRoles(){
    this.spinner.show()
    let final_arr=[]
    var orgObject:any={}
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    orgObject.UserID=uid
    // orgObject.UID=uid
    orgObject.StudyID=this.globalID
    orgObject.RoleName=this.addOrEditRole.controls.RoleName.value
    var perm=''
    this.dashboard_cat.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.study_roles.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.data_changes.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.depots.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.sites.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.supplies.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.subjects.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.sub_acc.sort(function (a, b) {
      return a.ID - b.ID;
    });
    this.reports.sort(function (a, b) {
      return a.ID - b.ID;
    });
    final_arr=this.dashboard_cat.concat(
      this.study_roles,
      this.data_changes,
      this.depots,
      this.sites,
      this.supplies,
      this.subjects,
      this.sub_acc,
      this.reports
      )
    for(let i=0;i<final_arr.length;i++){
      if(final_arr[i]?.selected){
        perm+="1"
      }
      else{
        perm+="0"
      }
    }
    orgObject.Permission=perm
    if(this.submitButton=='ADD'){
      orgObject.Action='ADD'
      this.roleService.addUpdateRoles(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.StudyRole[0]
          if(sucObj?.ID==3){
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
          // this.scheduleSetup.reset()
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
      orgObject.ID=this.editRole.ID
      console.log(orgObject)
      this.roleService.addUpdateRoles(orgObject).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.StudyRole[0]
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
}
