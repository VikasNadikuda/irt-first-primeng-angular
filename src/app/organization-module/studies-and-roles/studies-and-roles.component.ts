import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyServiceService} from '../services/study-service.service'
import { of } from 'rxjs';
import {MenuSharedService} from '../../services/menu-shared.service'
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-studies-and-roles',
  templateUrl: './studies-and-roles.component.html',
  styleUrls: ['./studies-and-roles.component.css']
})
export class StudiesAndRolesComponent implements OnInit {
  @BlockUI('viewStudies') loader: NgBlockUI;

  studies=[]
  statuses: any[];
  _selectedColumns: any[];
  colum:any[]=[]
  display=false
  loading: boolean = true;
  
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private studyService:StudyServiceService,
    private menuService:MenuSharedService
    ) { }
  cols :any= [];
  defaultStudy
  ngOnInit(): void {
    // this.studyService.setStudy(this.studies)  //uncomment this
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject?.u_id)
  // this.loader.start();
  this.cols = [
    { field: 'PROTOCAL_ID', header: 'Protocol ID' },
    { field: 'STUDY_NAME', header: 'Study Code' },
    { field: 'SPONSOR', header: 'Sponsor' }

  ];
  for(let i=0;i<this.cols.length;i++){
    this.colum.push(this.cols[i].field)
  }
  this._selectedColumns = this.cols;
  console.log('comp')
  this.studyService.setStudy([])

  this.defaultStudy=this.studyService.globalStudy
  this.studies=this.studyService.getAllStudies()
  console.log(this.studies)
  }
ngOnDestroy(){
  this.toastr.clear()
}

studyChanged(e,obj){
  this.defaultStudy=obj

  if(e.target.checked==true){
    this.studyService.studyChanged(obj)
  }
  else if(e.target.checked==false){
    if(this.studies.indexOf(obj)==0){
      this.defaultStudy=this.studies[this.studies.indexOf(obj)+1]
    }
   else{
      this.defaultStudy=this.studies[this.studies.indexOf(obj)-1]
      this.studyService.studyChanged(obj)
    }
  }
  
} 

@Input() get selectedColumns(): any[] {
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
  this.router.navigate(['manageOrganisation/addOrEditOrganisation'],{state:{organisation:data}})
}
exportPdf() {
  const doc = new jsPDF();
  const rows=[]
  let temp=[]
  let columns=[]
  columns=JSON.parse(JSON.stringify(this.colum));
  columns.unshift('Organization_ID')
  columns.unshift('Organization_Name')
  this.studies.forEach(element => {
    temp=[]
    for(let i=0;i<columns.length;i++){
      if(columns[i]=='Status'){
        if(element[columns[i]]==1){
          temp.push('Active')
        }
        else{
          temp.push('Inactive')
        }
      }
      else{
        temp.push(element[columns[i]])

      }
    }
    rows.push(temp);
  });
  doc.autoTable({body:rows,columns:columns})
  doc.save('studies.pdf');

}
exportExcel(type) {
  let data=[]
  let columns=[]
  columns=JSON.parse(JSON.stringify(this.colum));
  columns.unshift('Organization_ID')
  columns.unshift('Organization_Name')
  columns.unshift('Role_Name')

    this.studies.forEach(element => {
    let obj:any={}
    for(let i=0;i<columns.length;i++){
      if(columns[i]=='Status'){
        if(element[columns[i]]==1){
          obj[columns[i]]='Active'
        }
        else{
          obj[columns[i]]='Inactive'

       }
      }
      else{
        obj[columns[i]]=element[columns[i]]      

      }
    }
    data.push(obj);
  });
    import("xlsx").then(xlsx => {
      var worksheet = xlsx.utils.aoa_to_sheet([
        ["Created By :",'Vikas'],
      ]);
      xlsx.utils.sheet_add_json(worksheet, data, {header:columns, origin:"A6"});
        // const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
        this.saveAsExcelFile(excelBuffer, "studies",type);
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
