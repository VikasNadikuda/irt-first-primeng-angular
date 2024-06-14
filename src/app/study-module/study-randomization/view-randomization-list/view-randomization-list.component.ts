import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyRoleService} from '../../services/study-role.service'
import {TreatmentsService} from "../../services/treatments.service"
import { FileUpload } from 'primeng/fileupload';
import {RandomService} from '../../services/random.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-view-randomization-list',
  templateUrl: './view-randomization-list.component.html',
  styleUrls: ['./view-randomization-list.component.css']
})
export class ViewRandomizationListComponent implements OnInit {
  @BlockUI('randomisation') loader: NgBlockUI;
  @ViewChild('fileInput5') fileInput: FileUpload;

  statuses: any[];
  title="Upload Randomization List"
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  fileName=null
  display:boolean=false
  randomisation:any=[]
  uploadedFiles: any[] = [];
  inventory=null
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public treatService:TreatmentsService,
    private randomService:RandomService
  ) { }
  inventory_types=[
    {LIBRARY_VALUE: 'Bulk', LIBRARY_ID: 'Bulk'},
    {LIBRARY_VALUE: 'Discrete', LIBRARY_ID: 'Discrete'}
  ]
  globalID
  globalStudy
  ngOnInit(): void {
    this.cols = [
      { field: 'FILENAME', header: 'File Name' },
      { field: 'USERNAME', header: 'Uploaded By' },
      { field: 'CREATED_DATE', header: 'Uploaded Date' },
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this.globalStudy=this.studyService.globalStudyDetails
    console.log(this.globalStudy)
    this.randomService.getRandomLists(this.globalID).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.randomisation=success.Table1
          }
          else{
            this.randomisation=[]
            this.spinner.hide()
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.randomisation=[]
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
  listDetails=[]
  viewDetails(random){
    this.loader.start()
    this.randomService.getLists(this.globalID,random.ID).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
          if(success.Table1?.length!=0){
            this.listDetails=success.Table1
            // this.display=true
            this.router.navigate(['study/randomization/listDetails'],{state:{listDetails:this.listDetails}})

          }
          else{
            this.toastr.warning("", 'No kit details found',{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.listDetails=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.listDetails=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  showDialog() {
    this.display = true;
    }
    onUpload(event) {
      console.log('upload')
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
      this.toastr.success("", 'File Uploaded',{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });
    }
    private selectFilesToUpload() {
      this.uploadedFiles = [];
      for (var i = 0; i < this.fileInput.files.length; i++) { 
        this.uploadedFiles.push(this.fileInput.files[i]);
      }
    }
    upload(){
      console.log(this.uploadedFiles)
      this.spinner.show()
      console.log(this.uploadedFiles)
      // const formdata=new FormData()
      console.log(this.uploadedFiles)
      const formdata=new FormData()
      formdata.append('file',this.uploadedFiles[0])
      const user_obj= JSON.parse(localStorage.getItem('currentUser'));
      let userID=Number(user_obj.u_id)
      formdata.append('file',this.uploadedFiles[0])
      console.log(formdata)
      this.randomService.uploadFile(formdata,userID,this.globalID,this.fileName).subscribe(
        (success)=>{
          console.log(success)
          if(success?.Code==2){
            this.toastr.success("", success?.Msg,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            if(success?.Data?.length!=0){
              this.randomisation=success.Data
            }
            else{
              this.randomisation=[]
            }
          }

          this.spinner.hide()
          
        },
        (error)=>{
          this.spinner.hide()
          this.randomisation=[]
          console.log(error)
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
  
    }
    removeFiles(){
      this.uploadedFiles=[]
    }
}
