import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyRoleService} from '../../services/study-role.service'
import {StudySiteService} from '../../services/study-site.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import {StudyVisitsService} from '../../services/study-visits.service'

const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-view-visits',
  templateUrl: './view-visits.component.html',
  styleUrls: ['./view-visits.component.css']
})
export class ViewVisitsComponent implements OnInit {
  @BlockUI('visitsPage') loader: NgBlockUI;
  statuses: any[];
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  visits:any=[]
  globalID
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public siteService:StudySiteService,
    public visitService:StudyVisitsService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'VISITNAME', header: 'Visit Name' },
      { field: 'VISITORDER', header: 'Visit Order' },
      { field: 'WINDOW_TYPE', header: 'Window Type' },
      { field: 'TARGETDAYS', header: 'Target Days' },
      { field: 'MINDAYS', header: 'Min Days' },
      { field: 'MAXDAYS', header: 'Max Days' },
      { field: 'RANDOMIZATION', header: 'Randomization' },
      { field: 'ASSIGN_TREATMENT', header: 'Dispense Visit' },
      { field: 'NEXTVISIT', header: 'Reset Next Visit' },
      { field: 'DESCRIPTION', header: 'Description' }
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this.visitService.getVisits(this.globalID).subscribe(
      (success)=>{
        this.loader.stop();
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
              this.visits=success?.Table1
          }
          else{
            this.visits=[]
          }
      },
      (error)=>{
        console.log(error)
        this.loader.stop();
        this.visits=[]
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
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    var temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    this.visits.forEach(element => {
      temp=[]

      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('visits.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    this.visits.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "sites_list",type);
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
  configure(visit){
    this.loader.start()
    this.visitService.getKitTypes(this.globalID,visit.ID).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
          if(success.Table1?.length!=0){
            var vis=success.Table1
            // this.display=true
            this.router.navigate(['study/manageVisit/visitConfig'],{state:{visitDetails:vis,obj:visit}})

          }
          else{
            // this.toastr.warning("", 'No kit details found',{
            //   positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            // });
            vis=[]

            this.router.navigate(['study/manageVisit/visitConfig'],{state:{visitDetails:vis,obj:visit}})
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        visit=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  edit(visit){
    this.router.navigate(['study/manageVisit/scheduleVisits'],{state:{visitDetails:visit}})

  }
}
