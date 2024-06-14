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
import {StudyServiceService} from '../../services/study-service.service'
import {KitService} from '../../services/kit.service'
@Component({
  selector: 'app-depot-kits',
  templateUrl: './depot-kits.component.html',
  styleUrls: ['./depot-kits.component.css']
})
export class DepotKitsComponent implements OnInit {
  @BlockUI('depotKitList') loader: NgBlockUI;
  title="Depot Wise Kit Lists"
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private orgService:OrganisationsService,
    private libraryService:LibraryService,
    private studyService:StudyServiceService,
    private kitService:KitService
  ) { }
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  kitLists=[]
  _selectedColumns1: any[];
  cols1 :any= [];
  colum1:any[]=[]
  headers1:any=[]
  kitDetails=[]
  globalID
  public breadcrumb: any;
  ngOnInit(): void {
     this.kitDetails=history.state.kitDetails
    // console.log(kitDetails)
    if(this.kitDetails==undefined){
      this.toastr.error("",'Please login again',{
        positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
      });  
      setTimeout(()=>{
        this.router.navigate(['organisation/drugPooling/kitLists'])
      },2000)    
    }
    this.cols1 = [
      { field: 'DEPOT_ID', header: 'Depot ID' },
      { field: 'SEQUENCE_NUMBER', header: 'Sequence Number' },
      { field: 'KITNAME', header: 'Kit ID' },
      { field: 'KIT_TYPE', header: 'Kit Type' },
      { field: 'LOT_NUMBER', header: 'Discrete Lot ID' },
      { field: 'EXPIRYDATE', header: 'Expiry Date' },
      { field: 'STATUS', header: 'Kit Status' },
      { field: 'CREATED_Date', header: 'Regular/Replacement' }
    ];
    for(let i=0;i<this.cols1.length;i++){
      this.colum1.push(this.cols1[i].field)
      this.headers1.push(this.cols1[i].header)

    }
    this._selectedColumns1 = this.cols1;
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Kit lists',
          'isLink': true,
          'link': '/organisation/drugPooling/kitLists'
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
    this.kitDetails.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers1})
    doc.save('kitDetails.pdf');
  
  }
  exportExcel1(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
  
    this.kitDetails.forEach(element => {
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
          this.saveAsExcelFile1(excelBuffer, "kitDetails",type);
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
