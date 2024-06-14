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
  selector: 'app-manage-state',
  templateUrl: './manage-state.component.html',
  styleUrls: ['./manage-state.component.css']
})
export class ManageStateComponent implements OnInit {
  @BlockUI('viewState') loader: NgBlockUI;
  @ViewChild('fileInput1') fileInput: FileUpload;
  edit=false
  title="Add State"
  stateOption:string='addState'
  addState:FormGroup
  countries:any=[];
  states:any=[];
  _selectedColumns: any[];
  cols :any= [];
  headers :any= [];

  colum:any[]=[]
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
      { field: 'LIBRARY_VALUE', header: 'Country' },
      { field: 'State_Name', header: 'State' },
      { field: 'STATUS', header: 'Status' }

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].field)

    }
    this._selectedColumns = this.cols;
    this.addState = this.formBuilder.group({
      STATUS: [null, Validators.required],
      country: [null, Validators.required],
      state: ['', [Validators.required,Validators.maxLength(100)]],

    })
    this.getCountry()
    this.libraryService.getStates().subscribe(
      (success)=>{
        this.loader.stop()
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.states=success.Table1
          }
          else{
            this.states=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.states=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )    
  }
  display: boolean = false;
  uploadedFiles: any[] = [];
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
  getCountry(){
    this.orgService.getCountry().subscribe(
      (success)=>{
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.countries=success.Table1
          }
          else{
            this.countries=[]
            this.spinner.hide()
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.countries=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }

  showDialog() {
      this.display = true;
      this.addState = this.formBuilder.group({
        STATUS: [null, Validators.required],
        country: [null, Validators.required],
        state: ['', [Validators.required,Validators.maxLength(100)]],
  
      })
    this.edit=false
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  stateEdit
  editState(obj){
    this.edit=true
    this.display=true
    // this.spinner.show()
    // this.stateOption=
    this.stateEdit=obj
    this.title="Edit State"
    this.addState = this.formBuilder.group({
      STATUS: [obj.STATUS, Validators.required],
      country: [obj.Country_ID, Validators.required],
      state: [obj.State_Name, [Validators.required,Validators.maxLength(100)]],
    })
    // this.getCountry()
    // this.countryChanged(obj.Country_ID)
  }
  states1=[]
  countryChanged(country){
    const obj={
      "CId": country,
      "Type":"STATE"
         
   }
    this.orgService.getState(obj).subscribe(
      (success)=>{
        // this.loader.stop()
        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.states1=success.Table1
          this.spinner.hide()
        }
        else{
          this.states1=[]
          this.spinner.hide()

        }
      },
      (error)=>{
        this.spinner.hide()
        this.states1=[]
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    ) 
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
    this.libraryService.uploadFile(formdata,userID,'STATE').subscribe(
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
        "Lib_Name": "STATE",
        "Lib_value":this.addState.controls.state.value,
        "Parent_Key":this.stateEdit.Country_ID,
        "UID":uid,
        "STATUS":this.addState.controls.STATUS.value,
        "Id":this.stateEdit.State_ID
      }
      this.libraryService.addUpdateLibrary(body).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Library[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.states=success?.Table1

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
        "Lib_Name": "CITY",
        "Lib_value":this.addState.controls.state.value,
        "Parent_Key":this.stateEdit.Country_ID,
        "UID":uid,
        "STATUS":this.addState.controls.STATUS.value,
      }
      this.libraryService.addUpdateLibrary(body).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Library[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            // this.submitButton='UPDATE'
            this.states=success?.Table1

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
    this.states.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('states.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.states.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "states",type);
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
    link.href = '../../../assets/SampleStateImportFile.xlsx';
    link.download = 'sample_sheet.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
