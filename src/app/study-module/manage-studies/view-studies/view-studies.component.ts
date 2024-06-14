import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyServiceService} from '../../../organization-module/services/study-service.service'
import { of } from 'rxjs';
import {MenuSharedService} from '../../../services/menu-shared.service'
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-view-studies',
  templateUrl: './view-studies.component.html',
  styleUrls: ['./view-studies.component.css']
})
export class ViewStudiesComponent implements OnInit {
  @BlockUI('viewStudy') loader: NgBlockUI;

  
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
  uid
  ngOnInit(): void {
    // this.studyService.setStudy(this.studies)  //uncomment this
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    this.uid=Number(userObject?.u_id)
  // this.loader.start();
  this.cols = [
    { field: 'PROTOCAL_ID', header: 'Protocol' },
    {field: 'STUDY_NAME', header: 'Study Code'},
    {field: 'ROLE', header: 'Study Role'}

  ];
  for(let i=0;i<this.cols.length;i++){
    this.colum.push(this.cols[i].field)
  }
  this._selectedColumns = this.cols;
  console.log('comp')
  // this.studyService.setStudy([])
  this.defaultStudy=this.studyService.globalStudy
  console.log(this.defaultStudy)
  this.studies=this.studyService.getAllStudies()
  console.log(this.studies)
  }
ngOnDestroy(){
  this.toastr.clear()
}

studyChanged(e,obj){
  this.spinner.show()
  this.defaultStudy=obj
  // console.log(obj)
  if(e.target.checked==false){
    if(this.studies.indexOf(obj)==0){
      // this.spinner.hide()
      this.defaultStudy=this.studies[this.studies.indexOf(obj)+1]
      

    }
   else{
      this.defaultStudy=this.studies[this.studies.indexOf(obj)-1]
    }
  }
  this.studyService.studyChanged(this.defaultStudy)
  var role

  console.log(role)
  // this.menuService.changeRole(role)
  
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
editStudy(study){
  // console.log(study)
  var stud=this.studyService.globalStudyDetails
  this.router.navigate(['study/addOrEditStudy'],{state:{studyDetails:stud}})
}
viewStudy(study){
  var stud=this.studyService.globalStudyDetails
  this.router.navigate(['study/studyDetails'],{state:{studyDetails:stud}})
}
}
