import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationsService } from "../../../services/organisations.service";
import { FileUpload } from 'primeng/fileupload';
import {LibraryService} from '../../../services/library.service'
import * as FileSaver from 'file-saver';
const { jsPDF } = require("jspdf");
import {StudyServiceService} from '../../services/study-service.service'
import {KitService} from '../../services/kit.service'

@Component({
  selector: 'app-kit-lists',
  templateUrl: './kit-lists.component.html',
  styleUrls: ['./kit-lists.component.css']
})
export class KitListsComponent implements OnInit {
  @BlockUI('viewKitLists') loader: NgBlockUI;
  title="View Kit Lists"

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private orgService:OrganisationsService,
    private libraryService:LibraryService,
    private studyService:StudyServiceService,
    private kitService:KitService
  ) { }
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  kitLists=[]
  _selectedColumns1: any[];
  cols1 :any= [];
  colum1:any[]=[]
  headers1:any=[]
  kitDetails=[]
  globalID
  ngOnInit(): void {
    this.spinner.show()
    this.globalID=this.studyService.globalStudy?.ORG_ID
    this.cols = [
      {field:'FILENAME',header:'File Name'},
      { field: 'FILETYPE', header: 'Inventory Type' },
      { field: 'USERNAME', header: 'Uploaded By' },
      { field: 'CREATED_DATE', header: 'Uploaded Date' },
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    this.cols1 = [
      { field: 'DEPOT_ID', header: 'Depot ID' },
      { field: 'SEQUENCE_NUMBER', header: 'Sequence Number' },
      { field: 'KITNAME', header: 'Kit ID' },
      { field: 'KIT_TYPE', header: 'Kit Type' },
      { field: 'LOT_NUMBER', header: 'Discrete Lot ID' },
      { field: 'EXPIRYDATE', header: 'Expiry Date' },
      { field: 'STATUS', header: 'Kit Status' },
      { field: 'CREATED_Date', header: 'Regular/Replacement' }
    ];
    for(let i=0;i<this.cols1.length;i++){
      this.colum1.push(this.cols1[i].field)
      this.headers1.push(this.cols1[i].header)

    }
    this._selectedColumns1 = this.cols1;
    this.kitService.getKitLists(this.globalID).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.kitLists=success.Table1
          }
          else{
            this.kitLists=[]
            this.spinner.hide()
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.kitLists=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )

    }
  ngOnDestroy(){
    this.toastr.clear()
  }
  display=false
  viewKitDetails(kit){
    this.loader.start()
    this.kitService.getKitDetails(this.globalID,kit.ID).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
          if(success.Table1?.length!=0){
            this.kitDetails=success.Table1
            // this.display=true
            this.router.navigate(['organisation/drugPooling/kitLists/depotKitLists'],{state:{kitDetails:this.kitDetails}})

          }
          else{
            this.toastr.warning("", 'No kit details found',{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.kitDetails=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.kitDetails=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )

  }

  @Input() get selectedColumns(): any[] {
    // console.log('ol')
  
    return this._selectedColumns;
  }
  @Input() get selectedColumns1(): any[] {
    // console.log('ol')
  
    return this._selectedColumns1;
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
  set selectedColumns1(val: any[]) {
    //restore original order
    this.colum1=[]
    this._selectedColumns1 = this.cols1.filter(col => val.includes(col));
    for(let i=0;i<this._selectedColumns1.length;i++){
        this.colum1.push(this._selectedColumns1[i].field)
    }   
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    console.log(columns,this.colum)
    this.kitLists.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('kitLists.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.kitLists.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        console.log(element,element[columns[i]])
        obj[this.headers[i]]=element[columns[i]]
        console.log(obj)
      }
      data.push(obj);
    }); 
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile(excelBuffer, "kitLists",type);
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
  exportPdf1() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
    this.kitDetails.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers1})
    doc.save('kitDetails.pdf');
  
  }
  exportExcel1(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
  
    this.kitDetails.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        console.log(element,element[columns[i]])
        obj[this.headers1[i]]=element[columns[i]]
      }
      data.push(obj);
    }); 
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile1(excelBuffer, "kitDetails",type);
      });
  }
  
  saveAsExcelFile1(buffer: any, fileName: string,type:string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.'+type;
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
  }
}
