import { Component, Input, OnInit } from '@angular/core';
import {OrganisationsService} from '../../../services/organisations.service'
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {UsersService} from '../../../services/users.service';
const { jsPDF } = require("jspdf");
import {StudyServiceService} from '../../services/study-service.service'

require('jspdf-autotable');
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  @BlockUI('viewUser') loader: NgBlockUI;
  statuses: any[];
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  users:any=[]
  constructor(
    private organisationService: OrganisationsService,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private userService:UsersService,
    private studyService:StudyServiceService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.cols = [
      { field: 'Role_Name', header: 'Role' },
      { field: 'Status', header: 'Status' }

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)
    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.ORG_ID
    this.userService.getUsers(id).subscribe(
    (success)=>{
      this.loader.stop();
      console.log(success)
        if(success.Table1!=undefined && success.Table1?.length!=0){
            this.users=success.Table1
        }
        else{
          this.users=[]
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
  editUser(data){
    console.log(data)
    this.router.navigate(['organisation/manageUsers/addOrEditUser'],{state:{userDetails:data}})
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));

    columns.unshift('Organization')
    columns.unshift('Email_Address')
    columns.unshift('Username')
    this.headers.unshift('Organization')
    this.headers.unshift('Email Address')
    this.headers.unshift('Username')

    console.log(columns,this.colum)
    this.users.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('users.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    columns.unshift('Organization')
    columns.unshift('Email_Address')
    columns.unshift('Username')
    this.headers.unshift('Organization')
    this.headers.unshift('Email Address')
    this.headers.unshift('Username')
    this.users.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        console.log(element,element[columns[i]])
        obj[this.headers[i]]=element[columns[i]]
      }
      data.push(obj);
    }); 
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile(excelBuffer, "users",type);
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

}
