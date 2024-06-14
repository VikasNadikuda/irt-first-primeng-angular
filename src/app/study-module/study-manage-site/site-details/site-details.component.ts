import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyRoleService} from '../../services/study-role.service'
import {StudySiteService} from '../../services/study-site.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';


const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent implements OnInit {
  @BlockUI('StudyViewSites') loader: NgBlockUI;
  statuses: any[];
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  sites:any=[]
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public siteService:StudySiteService

  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.cols = [
      { field: 'CFNAME', header: 'Contact Person' },
      { field: 'CCITY', header: 'City' },
      { field: 'COUNTRY_NAME', header: 'Country' }
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.STUDY_ID
    this.siteService.getAllSites(id).subscribe(
    (success)=>{
      this.loader.stop();
      console.log(success)
        if(success.Table1!=undefined && success.Table1?.length!=0){
            var array=success.Table1
            array.forEach(element => {
              if(element.DEPOT==0){
                this.sites.push(element)
              }
            });
        }
        else{
          this.sites=[]
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
  editSite(data){
    console.log(data)
    this.router.navigate(['study/manageSite/addOrEditSite'],{state:{siteDetails:data}})
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    var temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    columns.unshift('SITE_NAME')
    columns.unshift('SITE_ID')

    this.headers.unshift('Site Name')
    this.headers.unshift('Site ID')
    this.sites.forEach(element => {
      temp=[]

      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('sites.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    columns.unshift('SITE_NAME')
    columns.unshift('SITE_ID')

    this.headers.unshift('Site Name')
    this.headers.unshift('Site ID')
    this.sites.forEach(element => {
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
  editSiteStatus(){
    this.router.navigate(['study/manageSite/siteStatus'],{state:{siteDetails:this.sites}})

  }
  editSiteConfiguration(){
    this.router.navigate(['study/manageSite/siteConfiguration'])

  }
}
