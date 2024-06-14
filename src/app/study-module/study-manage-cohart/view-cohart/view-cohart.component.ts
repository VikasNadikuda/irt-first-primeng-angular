import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StudyRoleService} from '../../services/study-role.service'
import {CohartService} from '../../services/cohart.service'
import * as FileSaver from 'file-saver';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-view-cohart',
  templateUrl: './view-cohart.component.html',
  styleUrls: ['./view-cohart.component.css']
})
export class ViewCohartComponent implements OnInit {
  @BlockUI('cohort') loader: NgBlockUI;
  title="Add Cohort"
  addCohort:FormGroup
  countries:any=[];
  country=[]
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  cohort_list=[]
  headers:any[]=[]
  clonedProducts:any={}
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public cohortService:CohartService,
    public studyService:StudyServiceService,
  ) { }
  studyID
  ngOnInit(): void {
    this.studyID=this.studyService.globalStudy?.STUDY_ID
    this.addCohort = this.formBuilder.group({
      Status: [null, Validators.required],
      CohortName: [null, [Validators.required,Validators.maxLength(100)]],
    })
    this.cols = [
      { field: 'COHORT_NAME', header: 'Cohort Name' },
      { field: '"CURRENT_STATUS": ', header: 'Status' },
      { field: 'ACTIVATED_DATE', header: 'Last Activated' },
      { field: 'CREATED_DATE', header: 'Created Date' }

      
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.STUDY_ID  
  //   this.cohort_list=[
  //     {
  // "ID" : 1 ,
  // "COHORT_NAME": "501",
  //   "CURRENT_STATUS": "Active",
  //   "StudyID":1,
  // "ACTIVATED_DATE" : "2021-09-26T19:38:24",
  // "DEACTIVATED_DATE" :"2021-09-26T19:38:24",
  // "Last Activated/Deactivated By" : "Sridhar Kura",
  //   "CREATEDBY": 5,
  //    "CREATED_DATE": "2021-09-26T19:38:24",
  //         "UPDATEBY": 5,
  //         "UPDATED_DATE": "2021-09-26T19:45:39"
          
  //     }
  // ]
    this.cohortService.getAllCohort(id).subscribe(
      (success)=>{
        this.loader.stop();
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
              this.cohort_list=success.Table1
          }
          else{
            this.cohort_list=[]
          }
      },
      (error)=>{
        console.log(error)
        this.loader.stop();
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  display: boolean = false;
  showDialog() {
    this.display = true;
    this.addCohort = this.formBuilder.group({
      Status: [null, Validators.required],
      CohortName: [null, [Validators.required,Validators.maxLength(100)]],
    })
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  @Input() get selectedColumns(): any[] {
    // console.log('ol')
  
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this.colum=[]
    this._selectedColumns = this.cols.filter(col => val.includes(col));
    for(let i=0;i<this._selectedColumns.length;i++){
        this.colum.push(this._selectedColumns[i].field)
    }
    console.log(this._selectedColumns)
   
  }
  status=['Active','Inactive']
  statuses=[ {LIBRARY_VALUE: 'Active', LIBRARY_ID: 'Active'},
  {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 'Inactive'}]
  
  onRowEditInit(product) {
    this.clonedProducts[product.ID] = {...product};
  }

  onRowEditSave(product,index) {
    console.log(product)
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    this.spinner.show()
    var obj={
      "CohortName": product.COHORT_NAME,
      "Status": product.CURRENT_STATUS,
      "StudyID":product.STUDY_ID,
	    "UserID" : uid,
      "Action": "UPDATE",
	    "ID": product.ID
    }
    this.cohortService.addUpdateCohort(obj).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Cohort[0]
          if(sucObj?.ID==4){
            this.cohort_list=success?.Table1
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==5){
            this.cohort_list[index] = this.clonedProducts[product.ID];
            delete this.cohort_list[product.ID];
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 ){
            this.cohort_list[index] = this.clonedProducts[product.ID];
            delete this.cohort_list[product.ID];
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.cohort_list[index] = this.clonedProducts[product.ID];
            delete this.cohort_list[product.ID];
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
        },
        (error)=>{
          console.log(error)
          this.spinner.hide()
          this.cohort_list[index] = this.clonedProducts[product.ID];
          delete this.cohort_list[product.ID];
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )

  }

  onRowEditCancel(product, index: number) {
      this.cohort_list[index] = this.clonedProducts[product.ID];
      delete this.cohort_list[product.ID];
  }
  saveCohort(){
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    this.spinner.show()
    var obj={
      "CohortName": this.addCohort.controls.CohortName.value,
      "Status": this.addCohort.controls.Status.value,
      "StudyID":this.studyID,
	    "UserID" : uid,
      "Action": "ADD",
    }
    console.log(obj)

    this.cohortService.addUpdateCohort(obj).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          let sucObj=success.Cohort[0]
          if(sucObj?.ID==3){
            this.display=false
            this.cohort_list=success?.Table1
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
          console.log(error)
          this.spinner.hide()
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )

  }
  }
