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
const { jsPDF } = require("jspdf");
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import {SettKitListService} from '../../services/sett-kit-list.service'

@Component({
  selector: 'app-set-kitdetails',
  templateUrl: './set-kitdetails.component.html',
  styleUrls: ['./set-kitdetails.component.css']
})
export class SetKitdetailsComponent implements OnInit {
  @BlockUI('KitDetails') loader: NgBlockUI;
  title="View Kit Details"
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private orgService:OrganisationsService,
    private libraryService:LibraryService,
    private studyService:StudyServiceService,
    private kitService:SettKitListService
  ) { }
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  kitLists=[]
  kitDetails=[]
  globalID
  public breadcrumb: any;
  ngOnInit(): void {
    this.kitDetails=history.state.kitDetails
    this.cols = [
      { field: 'DEPOT_ID', header: 'Depot ID' },
      { field: 'SEQUENCE_NUMBER', header: 'Sequence Number' },
      { field: 'KITNAME', header: 'Kit ID' },
      { field: 'KIT_TYPE', header: 'Kit Type' },
      { field: 'LOT_NUMBER', header: 'Discrete Lot ID' },
      { field: 'EXPIRYDATE', header: 'Expiry Date' },
      { field: 'STATUS', header: 'Kit Status' },
      { field: 'CREATED_Date', header: 'Regular/Replacement' }
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
          'name': 'Settings',
          'isLink': true,
          'link': '/supply/settings'
        },
        {
          'name': 'View Kit Lists',
          'isLink': true,
          'link': '/supply/settings/kitLists'
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
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    this.kitDetails.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('kitDetails.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.kitDetails.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        console.log(element,element[columns[i]])
        obj[this.headers[i]]=element[columns[i]]
      }
      data.push(obj);
    }); 
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile(excelBuffer, "kitDetails",type);
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
