import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganisationsService } from "../../../services/organisations.service";
import {ToastrService  } from "ngx-toastr";
import { FileUpload } from 'primeng/fileupload';
import * as FileSaver from 'file-saver';
const { jsPDF } = require("jspdf");
import {LibraryService} from '../../../services/library.service'
import {SettCountryService} from '../../services/sett-country.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
@Component({
  selector: 'app-settings-country',
  templateUrl: './settings-country.component.html',
  styleUrls: ['./settings-country.component.css']
})
export class SettingsCountryComponent implements OnInit {
  @BlockUI('settCountry') loader: NgBlockUI;
  title="Country Release"
  countries:any=[];
  country=[]
  country_list=[]
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  cohort_list=[]
  headers:any[]=[]
  discrete_ids=[]
  bulk_ids=[]
  clonedProducts:any={}
  studyID
  studyDetails
  breadcrumb
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private service:SettCountryService,
    private studyService:StudyServiceService,
    private spinner:NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.studyID=this.studyService.globalStudy?.STUDY_ID
    this.studyDetails=this.studyService.globalStudyDetails
    console.log(this.studyDetails)
    this.cols = [
      { field: 'LIBRARY_NAME,', header: 'Country' },
      { field: '"D_LOT_ID": ', header: 'Discrete Lot ID(s)' },
      { field: 'B_LOT_ID', header: 'Bulk Lot ID(s)' }
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.STUDY_ID  
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Settings',
          'isLink': true,
          'link': '/supply/settings'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
    this.service.getIDs(this.studyID).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
        if(success?.Table?.length!=0){
          this.country_list=success?.Table
        }
        else{
          // this.submitButton='Add'
          this.country_list=[]

        }
        if(success?.Table1?.length!=0){
          this.discrete_ids=success?.Table1
        }
        else{
          // this.submitButton='Add'
          this.discrete_ids=[]

        }
        if(success?.Table2?.length!=0){
          this.bulk_ids=success?.Table2
        }
        else{
          // this.submitButton='Add'
          this.bulk_ids=[]

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
   
  onRowEditInit(product) {
    // this.clonedProducts[product.COUNTRY_ID] = {...product};
    // console.log(this.clonedProducts)
  }

  onRowEditSave(product,index) {
    console.log(product)
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    this.spinner.show()
    
    var obj:any={
      "BLotID": product.B_LOT_ID,
      "DLotID": product.D_LOT_ID,
      "StudyID":product.STUDY_ID,
	    "UserID" : uid,
      'CountryID':product.COUNTRY_ID
    }
    if(product.ID==undefined || product.ID==null ){
      obj.Action='ADD'
    }
    else{
      obj.Action='UPDATE'
	    obj.ID=product.ID

    }
    if(obj.Action=='ADD'){
      console.log(obj)
      this.service.addUpdateCountry(obj).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Supplies[0]
          if(sucObj?.ID==3){
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
    else{
      console.log(obj)

      this.service.addUpdateCountry(obj).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Supplies[0]
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


  }

  onRowEditCancel(product, index: number) {
      this.cohort_list[index] = this.clonedProducts[product.COUNTRY_ID];
      delete this.cohort_list[product.COUNTRY_ID];
  }
  saveCohort(){
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    this.spinner.show()
  //   var obj={
  //     "CohortName": this.addCohort.controls.CohortName.value,
  //     "Status": this.addCohort.controls.Status.value,
  //     "StudyID":this.studyID,
	//     "UserID" : uid,
  //     "Action": "ADD",
  //   }
  //   console.log(obj)

  //   this.cohortService.addUpdateCohort(obj).subscribe(
  //       (success)=>{
  //         console.log(success)
  //         this.spinner.hide()
  //         let sucObj=success.Cohort[0]
  //         if(sucObj?.ID==3){
  //           this.display=false
  //           this.cohort_list=success?.Table1
  //           this.toastr.success("", sucObj.Message,{
  //             positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
  //           });
  //         }
  //         else if(sucObj?.ID==5){
  //           this.toastr.error("", sucObj.Message,{
  //             positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
  //           });
  //         }
  //         else if(sucObj?.ID==1 || sucObj?.ID==2 ){
  //           this.toastr.warning("", sucObj.Message,{
  //             positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
  //           });
  //         }
  //         else{
  //           this.toastr.error("", sucObj.Message,{
  //             positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
  //           });
  //         }
  //       },
  //       (error)=>{
  //         console.log(error)
  //         this.spinner.hide()
  //         this.toastr.error("", error.message,{
  //           positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
  //         });
  //       }
  //     )

  }
}

