import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as FileSaver from 'file-saver';
import { ViewportScroller } from '@angular/common';
import {AuditTrailService} from '../../../services/audit-trail.service'
import { DatePipe } from '@angular/common';
const { jsPDF } = require("jspdf");
@Component({
  selector: 'app-system',
  templateUrl: './login-trail.component.html',
  styleUrls: ['./login-trail.component.css']
})
export class LoginTrailComponent implements OnInit {
  @BlockUI('logTrail') loader: NgBlockUI;
  _selectedColumns: any[];
  cols :any= [];
  headers :any= [];

  colum:any[]=[]
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private vps: ViewportScroller,
    private auditService:AuditTrailService,
    private datePipe: DatePipe
  ) { }
  fromDate=new Date()
  toDate=new Date()
  today=new Date()
  display=false
  loginTrails=[]
  ngOnInit(): void {
    // this.loader.start();
    this.fromDate.setDate(this.fromDate.getDate() - 7);
    this.cols = [
      { field: 'User_name', header: 'User Name' },
      { field: 'IP', header: 'IP' },
      { field: 'LOGIN_DATE', header: 'Login Date' },
      { field: 'LOGIN_STATUS', header: 'Status' }

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].field)

    }
    this._selectedColumns = this.cols;

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
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    console.log(columns,this.colum)
    this.loginTrails.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('loginTrails.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum))

    this.loginTrails.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        obj[this.headers[i]]=element[columns[i]]
      }
      data.push(obj);
    }); 
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile(excelBuffer, "loginTrails_list",type);
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

  displayTable(){
    this.spinner.show()
    let fromDate=this.datePipe.transform(this.fromDate, 'dd-MMM-yyyy').toLocaleUpperCase()
    let toDate=this.datePipe.transform(this.toDate, 'dd-MMM-yyyy').toLocaleUpperCase()
    const body={
      "Action": "Login",
      "FromDate": fromDate,
      "ToDate":toDate
           
    }
    console.log(body)
    this.auditService.getTrails(body).subscribe(
      (success)=>{
        this.spinner.hide()
        this.display=true
        console.log(success)
        if(success.Table1!=undefined && success.Table1?.length!=0){
            this.loginTrails=success.Table1
        }
        else{
          this.loginTrails=[]
          this.toastr.warning("", 'No login trails found for this period',{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }

      },
      (error)=>{
        this.spinner.hide()
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
    // let el=document.getElementById('trailBody')
    // setTimeout(()=>{
    //   this.vps.scrollToAnchor('trailBody')

    // },2000)
  }
}
