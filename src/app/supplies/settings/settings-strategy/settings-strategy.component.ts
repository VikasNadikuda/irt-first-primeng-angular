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
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-settings-strategy',
  templateUrl: './settings-strategy.component.html',
  styleUrls: ['./settings-strategy.component.css']
})
export class SettingsStrategyComponent implements OnInit {
  @BlockUI('settStrategy') loader: NgBlockUI;
  breadcrumb:any
  title='Auto Order Settings'
  predForm:FormGroup
  constructor(
    private toastr:ToastrService,
    private service:InventorySetService,
    private studyService:StudyServiceService,
    private formBuilder: FormBuilder
  ) { }
  items: MenuItem[];
  activeItem: MenuItem;
  initialList=[]
  bufferList=[]
  predictionList=[]
  clonedProducts1:any={}
  clonedProducts2:any={}
  clonedProducts3:any={}
  selectedSites1=[]
  selectedSites2=[]
  selectedSites3=[]

  _selectedColumns2: any[];
  cols2 :any= [];
  colum2:any[]=[]
  headers2:any=[]

  _selectedColumns1: any[];
  cols1 :any= [];
  colum1:any[]=[]
  headers1:any=[]

  _selectedColumns3: any[];
  cols3 :any= [];
  colum3:any[]=[]
  headers3:any=[]
  general_types=[
    {LIBRARY_VALUE: 'Yes', LIBRARY_ID: 'Yes'},
    {LIBRARY_VALUE: 'No', LIBRARY_ID: 'No'}
  ]
  ngOnInit(): void {
    this.items= [
      {label: 'Initial Order',command: (event) => {
        this.activeItem=event.item
      }},
      {label: 'Buffer Strategy',command: (event) => {
        this.activeItem=event.item
      }},
      {label: 'Prediction Strategy',command: (event) => {
        this.activeItem=event.item
      }},
  ];
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
    this.activeItem = this.items[0];
    this.cols1 = [
      { field: 'InitialOrder', header: 'Initial Order' },
      { field: 'Low', header: 'Low' },
      { field: 'Medium', header: 'Medium' },
      { field: 'High', header: 'High' },

    ];
    for(let i=0;i<this.cols1.length;i++){
      this.colum1.push(this.cols1[i].field)
      this.headers1.push(this.cols1[i].header)

    }
    this._selectedColumns1 = this.cols1;
    this.cols2 = [
      { field: 'InitialOrder', header: 'Initial Order' },
      { field: 'Low', header: 'Low' },
      { field: 'Medium', header: 'Medium' },
      { field: 'High', header: 'High' },

    ];
    for(let i=0;i<this.cols1.length;i++){
      this.colum1.push(this.cols1[i].field)
      this.headers1.push(this.cols1[i].header)

    }
    this._selectedColumns1 = this.cols1;
    this.predForm = this.formBuilder.group({
      predict: [null, [Validators.required]],
      recruit: [null, [Validators.required]],

    })
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
    // console.log(this._selectedColumns1)
   
  }
  
  onRowEditInit1(product) {
    this.clonedProducts1[product.ID] = {...product};
  }

  onRowEditSave1(product,index) {
    console.log(product)
  }
  onRowEditCancel1(product, index: number) {
    this.initialList[index] = this.clonedProducts1[product.ID];
    delete this.initialList[product.ID];
}
  onRowEditInit2(product) {
    this.clonedProducts2[product.ID] = {...product};
  }

  onRowEditSave2(product,index) {
    console.log(product)
  }
  onRowEditCancel2(product, index: number) {
    this.bufferList[index] = this.clonedProducts2[product.ID];
    delete this.bufferList[product.ID];
  }
  onRowEditInit3(product) {
    this.clonedProducts3[product.ID] = {...product};
  }

  onRowEditSave3(product,index) {
    console.log(product)
  }
  onRowEditCancel3(product, index: number) {
    this.predictionList[index] = this.clonedProducts3[product.ID];
    delete this.predictionList[product.ID];
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
    // console.log(1ns,this.colum1)
    this.initialList.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers1})
    doc.save('initialList.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
  
    this.initialList.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        console.log(element,element[columns[i]])
        obj[this.headers1[i]]=element[columns[i]]
        console.log(obj)
      }
      data.push(obj);
    }); 
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile(excelBuffer, "initialList",type);
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
