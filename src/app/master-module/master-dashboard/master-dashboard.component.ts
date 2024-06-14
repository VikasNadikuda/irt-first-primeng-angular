import { Component, Input, OnInit } from '@angular/core';
import {Organisation} from '../manage-organisation/view-organisations/organisation'
import {OrganisationsService} from '../../services/organisations.service'
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {MasterDashboardService} from '../../services/master-dashboard.service'
@Component({
  selector: 'app-master-dashboard',
  templateUrl: './master-dashboard.component.html',
  styleUrls: ['./master-dashboard.component.css']
})
export class MasterDashboardComponent implements OnInit {
  @BlockUI('dashTable') loader: NgBlockUI;
  @BlockUI('data') loader1: NgBlockUI;

  constructor(
    private organisationService: OrganisationsService,
    private toastr:ToastrService,
    private router:Router,
    private dashService:MasterDashboardService,
    private spinner:NgxSpinnerService
  ) {
  }
  single: any[] 
  single1: any[]
  view: any[] = [500, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: [ '#176d98', 'red']
  };



  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  statuses: any[];
  _selectedColumns: any[];
  cols :any= [];

  colum:any[]=[]
  
  organisations: Organisation[]=[]
  ngOnInit(): void {
    this.cols = [
      { field: 'Organization_Name', header: 'Organization Name' },
      { field: 'Country_Name', header: 'Country' },
      { field: 'State_Name', header: 'State' },
      { field: 'Status', header: 'Status' },

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
    }
    this._selectedColumns = this.cols;
        this.organisationService.getOrganisations().subscribe(
      (success)=>{
        this.loader.stop();
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
              this.organisations=success.Table1
              this.getChartDetails()
              // let columns=Object.keys( this.organisations[0])
              // for(let i=0;i<columns.length;i++){
              //   // let obj={
              //   //   name:columns[i],
              //   //   header:columns[i]
              //   // }
              //   // this.cols.push(obj)
              // }
          }
          else{
            this.organisations=[]
            this.getChartDetails()

          }
      },
      (error)=>{
        console.log(error)
        this.getChartDetails()

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
  
  
  hitRateOptions = {
    bodyClass: ['bg-hexagons', 'pt-0'],
    headerClass: ['bg-hexagons'],
    cardClass: ['pull-up'],
    close: false,
    expand: false,
    minimize: false,
    reload: true
  };
  getChartDetails(){
    this.dashService.getDetails().subscribe(
      (success)=>{
        this.loader.stop();
        this.single1=success?.Table1
        this.single=success.Table
      },
      (error)=>{
        console.log(error)
        this.loader.stop();
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  //   this.single1= [
  //     {
  //         "name": "Active",
  //         "value": 2
  //     },
  //     {
  //         "name": "Inactive",
  //         "value": 0
  //     }
  // ]
  //   this.single= [
  //     {
  //         "name": "Active",
  //         "value": 5
  //     },
  //     {
  //         "name": "Inactive",
  //         "value": 0
  //     }
  // ]
  }
  
  
    exportPdf() {
      // const doc = new jsPDF('p', 'pt');
      // autoTable(doc, { html: '#dt' })
      // doc.save('products.pdf');
    
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
  editOrganisation(data){
    console.log(data)
    this.router.navigate(['master/manageOrganisation/addOrEditOrganisation'],{state:{organisation:data}})
  }
  exportExcel() {
    const options={
      header:this.colum
    }
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.organisations,options);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "organisations");
      });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
