import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import {StudyKitService} from '../../services/study-kit.service';
import {StudyRoleService} from '../../services/study-role.service'
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-kit-types',
  templateUrl: './kit-types.component.html',
  styleUrls: ['./kit-types.component.css']
})
export class KitTypesComponent implements OnInit {
  @BlockUI('viewskt') loader: NgBlockUI;
  statuses: any[];
  _selectedColumns: any[];
  colum:any[]=[]
  headers:any=[]
  display=false
  loading: boolean = true;
  kitTypes=[]
  cols :any= [];

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public kitService:StudyKitService,
    public studyService:StudyServiceService
  ) { }
  ngOnInit(): void {
    this.cols = [
      { field: 'KIT_TYPE', header: 'Kit Type' },
      { field: 'KIT_TYPE_ID', header: 'Kit ID' },
      { field: 'INVENTORY_TYPE', header: 'Inventory Type' },
      { field: 'CATEGORY', header: 'Category' },
      { field: 'REGULAR_REPLACEMENT', header: 'Replacement kits same as dispense' }

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)
  
    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.STUDY_ID
  //   this.kitTypes=[
  //     {
  //         "ID": 1,
  //         "KIT_TYPE_ID": "K",
  //         "KIT_TYPE": "K",
  //         "INVENTORY_TYPE": "Bulk",
  //         "CATEGORY": "T",
  //   "REGULAR_REPLACEMENT": "Yes",
  //         "DESCRIPTION": "T",
  //         "ORG_ID": 1,
  //         "CREATEDBY": 5,
  //         "CREATED_DATE": "2021-09-26T19:38:24",
  //         "UPDATEBY": 5,
  //         "UPDATED_DATE": "2021-09-26T19:45:39"
  //     }
  // ]
    this.kitService.getKitList(id).subscribe(
      (success)=>{
        this.loader.stop()
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.kitTypes=success.Table1
          }
          else{
            this.kitTypes=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.kitTypes=[]
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
    this.kitTypes.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('kitTypes.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.kitTypes.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "kitTypes",type);
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
  editkitType(kitType){
    this.router.navigate(['study/manageKitTypes/addOrEditKitType'],{state:{kitDetails:kitType}})

  }
}
