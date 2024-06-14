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
  selector: 'app-settings-kits',
  templateUrl: './settings-kits.component.html',
  styleUrls: ['./settings-kits.component.css']
})
export class SettingsKitsComponent implements OnInit {
  @BlockUI('SetviewKitLists') loader: NgBlockUI;
  title="View Kit Lists"
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private orgService:OrganisationsService,
    private libraryService:LibraryService,
    private studyService:StudyServiceService,
    private kitService:SettKitListService,
  ) { }
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
  kitLists=[]
  kitDetails=[]
  globalID
  studyDetails
  breadcrumb
  ngOnInit(): void {
    this.spinner.show()
    this.globalID=this.studyService.globalStudy?.STUDY_ID
    this.studyDetails=this.studyService.globalStudyDetails
    console.log(this.globalID,this.studyDetails)

    this.cols = [
      { field: 'FILENAME                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ', header: 'Uploaded By' },
      { field: 'USERNAME', header: 'Uploaded By' },
      { field: 'CREATED_DATE', header: 'Uploaded Date' },
      { field: 'FILETYPE', header: 'Inventory Type' },
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    this.kitService.getKitLists(this.globalID,this.studyDetails?.INVENTORY).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.kitLists=success.Table1
          }
          else{
            this.kitLists=[]
            this.spinner.hide()
          }
      },
      (error)=>{
        this.spinner.hide()
        console.log(error)
        this.kitLists=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
    this.breadcrumb = {
      'mainlabel': this.title,
      'links': [    
        {
          'name': 'View Kit List',
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
  }
  ngOnDestroy(){
    this.toastr.clear()
  }
  display=false
  viewKitDetails(kit){
    this.loader.start()
    this.kitService.getKitDetails(this.globalID,kit.FILETYPE).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
          if(success.Table1?.length!=0){
            this.kitDetails=success.Table1
            // this.display=true
            this.router.navigate(['supply/settings/kitLists/kitDetails'],{state:{kitDetails:this.kitDetails}})

          }
          else{
            this.toastr.warning("", 'No kit details found',{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.kitDetails=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.kitDetails=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )

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
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    console.log(columns,this.colum)
    this.kitLists.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('kitLists.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.kitLists.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "kitLists",type);
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
