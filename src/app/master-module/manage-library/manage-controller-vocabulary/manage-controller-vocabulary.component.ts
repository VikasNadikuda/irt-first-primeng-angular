import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationsService } from "../../../services/organisations.service";
import { Place } from '../../manage-organisation/view-organisations/organisation';
import { FileUpload } from 'primeng/fileupload';
import {LibraryService} from '../../../services/library.service'
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-manage-controller-vocabulary',
  templateUrl: './manage-controller-vocabulary.component.html',
  styleUrls: ['./manage-controller-vocabulary.component.css']
})
export class ManageControllerVocabularyComponent implements OnInit {
  @BlockUI('viewLibrary') loader: NgBlockUI;
  @ViewChild('fileInput3') fileInput: FileUpload;
  edit=false
  title="Add Library"
  libraryOption:string='addLibrary'
  addLibrary:FormGroup
  libraries:any=[];
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any[]=[]

  display: boolean = false;
  uploadedFiles: any[] = [];

status=[
  {LIBRARY_VALUE: 'Active', LIBRARY_ID: 1},
  {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 0},]
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private orgService:OrganisationsService,
    private libraryService:LibraryService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loader.start()
    this.cols = [
      { field: 'LIBRARY_NAME', header: 'Library Name' },
      { field: 'LIBRARY_VALUE', header: 'Library Value' },
      { field: 'STATUS', header: 'Status' }

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].field)

    }
    this._selectedColumns = this.cols;
    this.addLibrary = this.formBuilder.group({
      LIBRARY_NAME: ['', Validators.required],
      LIBRARY_VALUE: ['', Validators.required],
      STATUS: [null, Validators.required],

    })
    this.libraryService.getLibraries().subscribe(
      (success)=>{
        this.loader.stop()
        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.libraries=success.Table1
        }
        else{
          this.libraries=[]
          this.loader.stop()
        }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.libraries=[]
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
  showDialog() {
    this.display = true;
    this.edit=false
    this.addLibrary = this.formBuilder.group({
      LIBRARY_NAME: [null, Validators.required],
      LIBRARY_VALUE: [null, Validators.required],
      STATUS: [null, Validators.required],
    })
}
libraryEdit
editLibrary(library){
  this.edit=true
  this.title="Edit Library"
  this.display=true
  this.libraryEdit=library
  this.addLibrary = this.formBuilder.group({
    LIBRARY_NAME: [library.LIBRARY_NAME, Validators.required],
    LIBRARY_VALUE: [library.LIBRARY_VALUE, Validators.required],
    STATUS: [library.STATUS, Validators.required],
  })

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
  this.libraryService.uploadFile(formdata,userID,'OTHER').subscribe(
    (success)=>{
      console.log(success)
      this.spinner.hide()
      
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
removeFiles(){
  this.uploadedFiles=[]
}

save(type){
  this.spinner.show()
  const userObject= JSON.parse(localStorage.getItem('currentUser'));
  const uid=Number(userObject.u_id)
  if(this.edit){
    const body={
      "Type": type,
      "Lib_Name": this.addLibrary.controls.LIBRARY_NAME.value,
      "Lib_value":this.addLibrary.controls.LIBRARY_VALUE.value,
      "Parent_Key":null,
      "UID":uid,
      "STATUS":this.addLibrary.controls.STATUS.value,
      "Id":this.libraryEdit.LIBRARY_ID
    }
    this.libraryService.addUpdateLibrary(body).subscribe(
      (success)=>{
        this.spinner.hide()
        let sucObj=success.Library[0]
        if(sucObj?.ID==3 || sucObj?.ID==4){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.libraries=success?.Table1

          // this.submitButton='UPDATE'
          this.display=false
        }
        else if(sucObj?.ID==5){
          this.toastr.error("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
        else {
          this.toastr.warning("", sucObj.Message,{
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
  else{
    const body={
      "Type": type,
      "Lib_Name": this.addLibrary.controls.LIBRARY_NAME.value,
      "Lib_value":this.addLibrary.controls.LIBRARY_VALUE.value,
      "Parent_Key":null,
      "UID":uid,
      "STATUS":this.addLibrary.controls.STATUS.value,
    }
    this.libraryService.addUpdateLibrary(body).subscribe(
      (success)=>{
        this.spinner.hide()
        let sucObj=success.Library[0]
        if(sucObj?.ID==3 || sucObj?.ID==4){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.libraries=success?.Table1

          // this.submitButton='UPDATE'
          this.display=false
        }
        else if(sucObj?.ID==5){
          this.toastr.error("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
        else {
          this.toastr.warning("", sucObj.Message,{
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
exportPdf() {
  const doc = new jsPDF();
  const rows=[]
  const temp=[]
  let columns=[]
  columns=JSON.parse(JSON.stringify(this.colum));
  console.log(columns,this.colum)
  this.libraries.forEach(element => {
    for(let i=0;i<columns.length;i++){
      temp.push(element[columns[i]])
    }
    rows.push(temp);
  });
  doc.autoTable({body:rows,columns:this.headers})
  doc.save('libraries.pdf');

}
exportExcel(type) {
  let data=[]
  let columns=[]
  columns=JSON.parse(JSON.stringify(this.colum));

  this.libraries.forEach(element => {
    let obj:any={}
    for(let i=0;i<columns.length;i++){
      console.log(element,element[columns[i]])
      obj[this.headers[i]]=element[columns[i]]
      console.log(obj)
    }
    data.push(obj);
  }); 
  const userObject= JSON.parse(localStorage.getItem('currentUser'));

    import("xlsx").then(xlsx => {
      var worksheet = xlsx.utils.aoa_to_sheet([
        ["Generated By :",userObject?.name],
        ['Generated on:',this.datePipe.transform(new Date(),'MMMM d, y, h:mm:ss a')] 

      ]);
      xlsx.utils.sheet_add_json(worksheet, data, {header:this.headers, origin:"A6"});
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
        this.saveAsExcelFile(excelBuffer, "libraries",type);
    });
}

saveAsExcelFile(buffer: any, fileName: string,type:string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.'+type;
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
}
downloadSample(){
  let link = document.createElement('a');
  link.setAttribute('type', 'hidden');
  link.href = '../../../assets/SampleCountryImportFile.xlsx';
  link.download = 'sample_sheet.xlsx';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

}
