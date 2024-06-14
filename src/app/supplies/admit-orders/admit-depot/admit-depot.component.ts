import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationsService } from "../../../services/organisations.service";
import { FileUpload } from 'primeng/fileupload';
import {LibraryService} from '../../../services/library.service'
import * as FileSaver from 'file-saver';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
const { jsPDF } = require("jspdf");
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-admit-depot',
  templateUrl: './admit-depot.component.html',
  styleUrls: ['./admit-depot.component.css']
})
export class AdmitDepotComponent implements OnInit {
  @BlockUI('getDepotDetails') loader: NgBlockUI;
  title="Depot Orders"

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private orgService:OrganisationsService,
    private studyService:StudyServiceService,
  ) { }
  public breadcrumb: any;
  _selectedColumns1: any[];
  cols1 :any= [];
  colum1:any[]=[]
  headers1:any=[]
  globalID
  depot_id_list=[]
  depot_list=[]
  discrete_depots=[]
  status_list=[
    'Available at depot',
    'In transit',
    'Quarentined',
    'Lost',
    'Damaged'
  ]
  ngOnInit(): void {
    this.loader.start()
    this.cols1 = [
      { field: 'Order_id', header: 'Order ID' },
      { field: 'Order_Date', header: 'Order Date' },
      { field: 'Order_By', header: 'Order By' },
      { field: 'Order_Method', header: 'Order Method' },
    ];
    for(let i=0;i<this.cols1.length;i++){
      this.colum1.push(this.cols1[i].field)
      this.headers1.push(this.cols1[i].header)

    }
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this._selectedColumns1 = this.cols1;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'Transact Orders',
          'isLink': true,
          'link': '/supply/transactOrders'
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
  @Input() get selectedColumns1(): any[] {
    // console.log('ol')
  
    return this._selectedColumns1;
  }
  set selectedColumns1(val: any[]) {
    //restore original order
    this.colum1=[]
    this._selectedColumns1 = this.cols1.filter(col => val.includes(col));
    for(let i=0;i<this._selectedColumns1.length;i++){
        this.colum1.push(this._selectedColumns1[i].field)
    }   
  }
  exportPdf1() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
    this.depot_list.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers1})
    doc.save('depot_list.pdf');
  
  }
  exportExcel1(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
  
    this.depot_list.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        console.log(element,element[columns[i]])
        obj[this.headers1[i]]=element[columns[i]]
      }
      data.push(obj);
    }); 
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile1(excelBuffer, "depot_list",type);
      });
  }
  
  saveAsExcelFile1(buffer: any, fileName: string,type:string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.'+type;
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
  }
}
