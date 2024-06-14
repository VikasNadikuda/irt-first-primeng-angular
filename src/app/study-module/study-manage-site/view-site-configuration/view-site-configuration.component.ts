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
  selector: 'app-view-site-configuration',
  templateUrl: './view-site-configuration.component.html',
  styleUrls: ['./view-site-configuration.component.css']
})
export class ViewSiteConfigurationComponent implements OnInit {
  @BlockUI('StudySites') loader: NgBlockUI;
  statuses: any[];
  title="Site Configuration"

  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  sites:any=[]
  globalID
  public breadcrumb: any;
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public studyService:StudyServiceService,
    public siteService:StudySiteService
  ) { }

  ngOnInit(): void {this.cols = [
    { field: 'SITE_NAME', header: 'Site' },
    { field: 'SITE_CAP', header: 'Randomization Cap' },
    { field: 'SITE_CAP_ALERT_LEVEL', header: 'Randomization Cap Alert Level' },
    { field: 'ORDER_APPROVAL', header: 'Order Approval Required' },
  ];
  for(let i=0;i<this.cols.length;i++){
    this.colum.push(this.cols[i].field)
    this.headers.push(this.cols[i].header)

  }
  this._selectedColumns = this.cols;
  this.globalID=this.studyService.globalStudy?.STUDY_ID
  this.siteService.getAllSiteConfig(this.globalID).subscribe(
  (success)=>{
    this.loader.stop();
    console.log(success)
      if(success.Table1!=undefined && success.Table1?.length!=0){
          this.sites=success.Table1
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
    this._selectedColumns = this.cols;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Site Information',
          'isLink': true,
          'link': '/study/siteManagement'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
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
editSiteConfig(site){
  this.router.navigate(['study/manageSite/siteConfiguration/addUpdateConfiguration'],{state:{siteDetails:site,sites:this.sites}})

}
}
