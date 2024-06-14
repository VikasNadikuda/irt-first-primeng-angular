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
import {DepotService} from '../../services/depot.service'
import {StudyServiceService} from '../../services/study-service.service';

@Component({
  selector: 'app-view-depot',
  templateUrl: './view-depot.component.html',
  styleUrls: ['./view-depot.component.css']
})
export class ViewDepotComponent implements OnInit {
  @BlockUI('viewDepot') loader: NgBlockUI;
  statuses: any[];
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  depots:any=[]
  constructor(
    private organisationService: OrganisationsService,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private userService:UsersService,
    private studyService:StudyServiceService,
    private depotService:DepotService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.cols = [
      { header: 'Contact', field: 'Contact_Person' },
      { header: 'Country', field: 'COUNTRY_NAME' },
      { header: 'City', field: 'CCITY' },

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)
    }
    this._selectedColumns = this.cols;
    const id=this.studyService.globalStudy?.ORG_ID

    this.depotService.getAllDepots(id).subscribe(
    (success)=>{
      this.loader.stop();
      console.log(success)
        if(success.Table1!=undefined && success.Table1?.length!=0){
          var array=success.Table1
          array.forEach(element => {
            if(element.DEPOT!=0){
              element.Contact_Person=element.CFNAME + ' '+ element.CLNAME
              if(element.DEPOT==1){
                element.Depot_Type='Supplying Depot'
  
              }
              else if(element.DEPOT==2){
                element.Depot_Type='Supplying and Destruction Depot'
  
              }
              else if(element.DEPOT==3){
                element.Depot_Type='Destruction Depot'
  
              }
              this.depots.push(element)

            }
    

          });        
        }
        else{
          this.depots=[]
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
  editDepot(data){
    console.log(data)
    this.router.navigate(['organisation/manageDepot/addOrEditDepot'],{state:{depotDetails:data}})
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    var temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    columns.unshift('Depot_Type')
    columns.unshift('SITE_NAME')
    columns.unshift('SITE_ID')

    this.headers.unshift('Depot Type')   
    this.headers.unshift('Depot Name')
    this.headers.unshift('Depot ID')
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
    columns.unshift('Depot_Type')
    columns.unshift('SITE_NAME')
    columns.unshift('SITE_ID')
    this.headers.unshift('Depot Type')   
    this.headers.unshift('Depot Name')
    this.headers.unshift('Depot ID')
    this.depots.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "depots_list",type);
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
