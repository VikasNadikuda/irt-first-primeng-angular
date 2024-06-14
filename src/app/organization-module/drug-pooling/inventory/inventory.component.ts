import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganisationsService } from "../../../services/organisations.service";
import {ToastrService  } from "ngx-toastr";
import { FileUpload } from 'primeng/fileupload';
import * as FileSaver from 'file-saver';
const { jsPDF } = require("jspdf");
import {LibraryService} from '../../../services/library.service'
import {InventoryService} from '../../services/inventory.service'
import { StudyServiceService } from '../../services/study-service.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  @BlockUI('inventory') loader: NgBlockUI;
  @ViewChild('fileInput3') fileInput: FileUpload;

  constructor(
    private toastr:ToastrService,
    private service:InventoryService,
    private studyService:StudyServiceService
    ) { }
  fileName=null
  globalID
  ngOnInit(): void {
    this.globalID=this.studyService.globalStudy?.ORG_ID

  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  inventory_types=[
    {LIBRARY_VALUE: 'Bulk', LIBRARY_ID: 'Bulk'},
    {LIBRARY_VALUE: 'Discrete', LIBRARY_ID: 'Discrete'}
  ]
  inventory
  uploadedFiles:any=[]
  private selectFilesToUpload() {
    this.uploadedFiles = [];
    for (var i = 0; i < this.fileInput.files.length; i++) { 
      this.uploadedFiles.push(this.fileInput.files[i]);
    }
  }
  upload(){
    // this.spinner.show()
    console.log(this.uploadedFiles)
    const formdata=new FormData()
    formdata.append('file',this.uploadedFiles[0])
    console.log(formdata)
    const user_obj= JSON.parse(localStorage.getItem('currentUser'));
    let userID=Number(user_obj.u_id)
    this.service.uploadFile(formdata,userID,this.globalID,this.inventory,this.fileName).subscribe(
      (success)=>{
        console.log(success)
        if(success?.Code==1 || success?.Code==2){
          this.toastr.warning("", success?.Msg,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
        }
        else if(success?.Code==3 || success?.Code==4){
          this.toastr.success("", success?.Msg,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
        }
        else{
          this.toastr.error("", success?.Msg,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
        
      },
      (error)=>{
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
    

  }
  downloadSample(type){
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    if(type=='Discrete'){
      link.href = '../../../assets/SampleKit_Discrete.xlsx';
      link.download = 'sample_discrete_sheet.xlsx';
    }
    else{
      link.href = '../../../assets/SampleKit_Bulk.xlsx';
      link.download = 'sample_bulk_sheet.xlsx';
    }
  
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  removeFiles(){
    this.uploadedFiles=[]
  }
}
