import { Component, Input, OnInit } from '@angular/core';
import {OrganisationsService} from '../../../services/organisations.service'
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {UsersService} from '../../../services/users.service';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
import {StudyDepotService} from '../../services/study-depot.service'
import {StudyRoleService} from '../../services/study-role.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
@Component({
  selector: 'app-depot-status',
  templateUrl: './depot-status.component.html',
  styleUrls: ['./depot-status.component.css']
})
export class DepotStatusComponent implements OnInit {
  @BlockUI('depotStatus') loader: NgBlockUI;
  statuses: any[];
  title="Depot Status"

  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  depots:any=[]
  clonedProducts:any={}
  globalID
  public breadcrumb: any;
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public depotService:StudyDepotService,
    public studyService:StudyServiceService
  ) { }
  depot_status=[
    {LIBRARY_VALUE: 'Active', LIBRARY_ID: 'Active'},
    {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 'Inactive'}

  ]
  supply_status=[
    {LIBRARY_VALUE: 'Hold', LIBRARY_ID: 'Hold'},
    {LIBRARY_VALUE: 'Release', LIBRARY_ID: 'Release'}

  ]
  ngOnInit(): void {
    this.globalID=this.studyService.globalStudy?.ORG_ID
    this.depots=history.state.depotDetails
    console.log(this.depots)
    this.cols = [
      {field:'SITE_ID',header:'Depot ID'},
      { field: 'SITE_NAME', header: 'Depot Name' },
      { field: 'Depot_Type', header: 'Depot Type' },
      { field: 'SITESTATUS', header: 'Depot Status' },
      { field: 'SUPPLYSTATUS', header: 'Supply Status' },

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Depot Information',
          'isLink': true,
          'link': '/study/depotManagement'
        },
        {
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
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
  onRowEditInit(product) {
    this.clonedProducts[product.ID] = {...product};
  }
  onRowEditSave(product,index) {
    console.log(product)
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    this.spinner.show()
    var obj={
      "Site_ID": product.ID,
      "SiteStatus": product.SITESTATUS,
      "SupplyStatus": product.SUPPLYSTATUS,
      "Study_ID":product.STUDY_ID,
      "DepotID":product.DEPOT,
	    "UserID" : uid,
      "Action": "UPDATE",
	    "ID": product.ID
    }
    this.depotService.addUpdateStatus(obj).subscribe(
        (success)=>{
          this.spinner.hide()
          console.log(success)
          let sucObj=success.SiteAct[0]
          if(sucObj?.ID==4){
            // this.depots=success?.Table1

            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==5){
            this.depots[index] = this.clonedProducts[product.ID];
            delete this.depots[product.ID];
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 ){
            this.depots[index] = this.clonedProducts[product.ID];
            delete this.depots[product.ID];
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.depots[index] = this.clonedProducts[product.ID];
            delete this.depots[product.ID];
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
        },
        (error)=>{
          console.log(error)
          this.spinner.hide()
          this.depots[index] = this.clonedProducts[product.ID];
          delete this.depots[product.ID];
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )

  }

  onRowEditCancel(product, index: number) {
      this.depots[index] = this.clonedProducts[product.ID];
      delete this.depots[product.ID];
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    var temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
     console.log(columns,this.colum)
    this.depots.forEach(element => {
      temp=[]

      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('depots.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.depots.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "depots",type);
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
