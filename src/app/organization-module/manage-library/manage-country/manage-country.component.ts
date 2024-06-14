import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationsService } from "../../../services/organisations.service";
import { FileUpload } from 'primeng/fileupload';
import {OrgLibraryService} from '../../services/org-library.service'
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
const { jsPDF } = require("jspdf");
import {StudyServiceService} from '../../services/study-service.service'

require('jspdf-autotable');
@Component({
  selector: 'app-manage-country',
  templateUrl: './manage-country.component.html',
  styleUrls: ['./manage-country.component.css']
})
export class OrgManageCountryComponent implements OnInit {
  @BlockUI('viewCountry1') loader: NgBlockUI;
  @ViewChild('fileInput1') fileInput: FileUpload;
  edit=false
  title="Add Country"
  countryOption:string='addCountry'
  addCountry:FormGroup
  countries:any=[];
  country=[]
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private studyService:StudyServiceService,
    private orgService:OrganisationsService,
    private libraryService:OrgLibraryService,
    private datePipe: DatePipe

  ) { }

  display: boolean = false;
  uploadedFiles: any[] = [];
  orgID
  showDialog() {
      this.display = true;
      this.edit=false
      this.addCountry = this.formBuilder.group({
        STATUS: [null, Validators.required],
        country: ['', [Validators.required,Validators.maxLength(100)]],
      })
  }
  status=[
    {LIBRARY_VALUE: 'Active', LIBRARY_ID: 1},
    {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 0},]
  ngOnInit(): void {
    this.loader.start()
    this.cols = [
      { field: 'Country_Name', header: 'Country' },
      { field: 'STATUS', header: 'Status' }

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].field)

    }
    this._selectedColumns = this.cols;
    this.addCountry = this.formBuilder.group({
      STATUS: [null, Validators.required],
      country: ['', [Validators.required,Validators.maxLength(100)]],
    })
    this.orgID=this.studyService.globalStudy?.ORG_ID
    this.libraryService.getCountries(this.orgID).subscribe(
      (success)=>{
        this.loader.stop()
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.countries=success.Table1
          }
          else{
            this.countries=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.countries=[]
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
  countryEdit
  editCountry(country){
    this.edit=true
    this.title="Edit Country"
    this.display=true
    this.countryEdit=country
    console.log(country)
    this.addCountry = this.formBuilder.group({
      STATUS: [country.STATUS, Validators.required],
      country: [country.Country_Name,[Validators.required,Validators.maxLength(100)]],
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
    this.libraryService.uploadFile(formdata,userID,'COUNTRY',this.orgID).subscribe(
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
        "Lib_Name": "COUNTRY",
        "Lib_value":this.addCountry.controls.country.value,
        "Parent_Key":null,
        "UID":uid,
        "ORGID":this.orgID,
        "STATUS":this.addCountry.controls.STATUS.value,
        "Id":this.countryEdit.Country_id
      }
      this.libraryService.addUpdateLibrary(body).subscribe(
        (success)=>{
          this.spinner.hide()

          console.log(success)
          let sucObj=success.Library[0]

          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.countries=success?.Table1
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
        "Lib_Name": "COUNTRY",
        "Lib_value":this.addCountry.controls.country.value,
        "Parent_Key":null,
        "UID":uid,
        "ORGID":this.orgID,
        "STATUS":this.addCountry.controls.STATUS.value,
      }
      this.libraryService.addUpdateLibrary(body).subscribe(
        (success)=>{
          this.spinner.hide()
          let sucObj=success.Library[0]
          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.countries=success?.Table1
            this.display=false

            // this.submitButton='UPDATE'
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
    this.countries.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('countries.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.countries.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "countries",type);
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
