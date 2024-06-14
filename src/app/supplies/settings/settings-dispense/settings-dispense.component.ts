import { Component,Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganisationsService } from "../../../services/organisations.service";
import {ToastrService  } from "ngx-toastr";
import { FileUpload } from 'primeng/fileupload';
import * as FileSaver from 'file-saver';
const { jsPDF } = require("jspdf");
import {LibraryService} from '../../../services/library.service'
import {InventorySetService} from '../../services/inventory-set.service'
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
@Component({
  selector: 'app-settings-dispense',
  templateUrl: './settings-dispense.component.html',
  styleUrls: ['./settings-dispense.component.css']
})
export class SettingsDispenseComponent implements OnInit {
  @BlockUI('settDispense') loader: NgBlockUI;
  breadcrumb:any
  title='DND, DNS & DNC'
  globalID
  dndForm:FormGroup
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]

  constructor(
    private toastr:ToastrService,
    private service:InventorySetService,
    private studyService:StudyServiceService,
    private formBuilder: FormBuilder,

  ) { }
  selectedSites=[]
  clonedProducts:any={}

  dispenseList=[]
  ngOnInit(): void {
    this.globalID=this.studyService.globalStudy?.ORG_ID
    this.cols = [
      { field: 'SITE', header: 'Site/Depot' },
      { field: 'Country', header: 'Country' },
      { field: 'LEAD', header: 'Lead Days' },
      { field: 'DNS', header: 'Do not Ship' },
      { field: 'DNC', header: 'Do not Consider' },

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
          'name': this.title,
          'isLink': false,
          'link': '#'
       }
      ]
    };
    this.dndForm = this.formBuilder.group({
      DND: ['', [Validators.required]],
    })
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
  ngOnDestroy(){
    this.toastr.clear()
  }
  onRowEditInit(product) {
    this.clonedProducts[product.ID] = {...product};
  }

  onRowEditSave(product,index) {
    console.log(product)
  }
  onRowEditCancel(product, index: number) {
    this.dispenseList[index] = this.clonedProducts[product.ID];
    delete this.dispenseList[product.ID];
}
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    console.log(columns,this.colum)
    this.dispenseList.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('dispenseList.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.dispenseList.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "dispenseList",type);
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
  update(){
    
  }
}
