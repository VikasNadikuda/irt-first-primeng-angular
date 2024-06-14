import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyRoleService} from '../../services/study-role.service'
import {TreatmentsService} from "../../services/treatments.service"

const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {
  @BlockUI('treat') loader: NgBlockUI;
  statuses: any[];
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  treatments:any=[]
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyRoleService,
    public treatService:TreatmentsService
  ) { }

  ngOnInit(): void {
    // this.loader.start();
    this.cols = [
      { field: 'RATIO', header: 'Ratio' },
      { field: 'CREATED_DATE', header: 'Created Date' },
      { field: 'DESCRIPTION', header: 'Description' },


    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.STUDY_ID
  //   this.treatments=[
  //     {
  // "ID" :1,
  // "TreatmentID": "501",
  //   "TreatmentName": "Omega",
  //   "Ratio":1,
  // "StudyID":1,
  // "UserID" : 4,
  //   "Description": "Desc",
  //   "Action": "ADD",
  //   "CREATEDBY": 5,
  //         "CREATED_DATE": "2021-09-26T19:38:24",
  //         "UPDATEBY": 5,
  //         "UPDATED_DATE": "2021-09-26T19:45:39"
          
  //     }
  // ]
    this.treatService.getAllTreatments(id).subscribe(
    (success)=>{
      this.loader.stop();
      console.log(success)
        if(success.Table1!=undefined && success.Table1?.length!=0){
            this.treatments=success.Table1
        }
        else{
          this.treatments=[]
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
  edittreatment(data){
    console.log(data)
    this.router.navigate(['study/manageTreatments/addOrEditTreatment'],{state:{treatDetails:data}})
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    var temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    columns.unshift('TreatmentName')
    columns.unshift('TreatmentID')

    this.headers.unshift('Treatment Name')
    this.headers.unshift('Treatment ID')
    this.treatments.forEach(element => {
      temp=[]

      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('treatments.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    columns.unshift('TreatmentName')
    columns.unshift('TreatmentID')

    this.headers.unshift('Treatment Name')
    this.headers.unshift('Treatment ID')
    this.treatments.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "treatments_list",type);
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
