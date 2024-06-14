import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import {StudyRoleService} from '../../services/study-role.service'
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.css']
})
export class ViewRolesComponent implements OnInit {
  @BlockUI('viewRoles') loader: NgBlockUI;
  statuses: any[];
  _selectedColumns: any[];
  colum:any[]=[]
  headers:any=[]
  display=false
  loading: boolean = true;
  roles=[]
  cols :any= [];

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public roleService:StudyRoleService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'ROLE_NAME', header: 'Role' },
      { field: 'CREATED_BY', header: 'Created By' },
      { field: 'CREATED_DATE', header: 'Created Date' },
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)
  
    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.STUDY_ID
  //   this.roles=[
  //     {
  // "ID" : 1,
  // "RoleName": "501",
  //   "Permission": "1o0101001010010010100100101",
  //   "StudyID":1,
  //   "CREATEDBY": 5,
  //    "CREATED_DATE": "2021-09-26T19:38:24",
  //         "UPDATEBY": 5,
  //         "UPDATED_DATE": "2021-09-26T19:45:39"
          
  //     }
  // ]
    this.roleService.getAllRolesForStudy(id).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.roles=success.Table1
          }
          else{
            this.roles=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.roles=[]
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
    this.roles.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('roles.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.roles.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "roles",type);
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
  editRole(role){
    this.router.navigate(['study/manageRoles/addOrEditRole'],{state:{roleDetails:role}})

  }

}
