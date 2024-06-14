import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StudyRoleService} from '../services/study-role.service'
import {CohartService} from '../services/cohart.service'
import {StudyUsersServService} from '../services/study-users-serv.service'
import * as FileSaver from 'file-saver';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import { DatePipe } from '@angular/common';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');
@Component({
  selector: 'app-study-manage-users',
  templateUrl: './study-manage-users.component.html',
  styleUrls: ['./study-manage-users.component.css']
})
export class StudyManageUsersComponent implements OnInit {
  @BlockUI('users') loader: NgBlockUI;
  addUser:FormGroup
  user_list:any=[];
  country=[]
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any[]=[]
  clonedProducts:any={}
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    public cohortService:CohartService,
    public studyService:StudyServiceService,
    private datePipe: DatePipe,
    private userService:StudyUsersServService

  ) { }
    globalID
    orgId
    depot_list=[]
    roles_list=[]
  ngOnInit(): void {
    this.addUser = this.formBuilder.group({
      AUSER_ID: [null, Validators.required],
      ROLE_ID: [null, Validators.required],
      USERTYPE: [null, Validators.required],
    })
    this.cols = [
      { field: 'USERNAME', header: 'Name' },
      { field: 'SITE_ID', header: 'Depot/Sites' },
      { field: 'ROLE_ID', header: 'Role' },
      { field: 'STATUS', header: 'Status' },
      { field: "USER_TYPE", header: 'Blind Type' }

      
    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    this.globalID=this.studyService.globalStudy?.STUDY_ID  
    this.orgId=this.studyService.globalStudy?.ORG_ID  
    this.userService.getAllUsers(this.globalID,this.orgId).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
        this.user_list=success?.Table
        this.depot_list=success?.Table2
        this.roles_list=success?.Table3
        for(let i=0;i<this.user_list?.length;i++){
          var sites=[]
          var list=[]
          sites=this.user_list[i]?.SITE_ID.split(",")
          for(let j=0;j<sites?.length;j++){
            let n=Number(sites[j])
            list.push(n)
          }
          let sitenames=[]
          for(let m=0;m<list?.length;m++){
            for(let k=0;k<this.depot_list?.length;k++){
              if(this.depot_list[k].ID==list[m]){
                sitenames.push(this.depot_list[k].NAME)
              }
            }
          }
          this.user_list[i].sites=sitenames
          this.user_list[i].SITE_ID=list
          for(let k=0;k<this.roles_list?.length;k++){
            if(this.roles_list[k].ID==this.user_list[i].ROLE_ID){
              this.user_list[i].roles=this.roles_list[k].NAME
            }
          }
        }
        
        console.log(this.user_list)
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  display: boolean = false;
  statuses=[ {LIBRARY_VALUE: 'Active', LIBRARY_ID: "Active"},
  {LIBRARY_VALUE: 'Inactive', LIBRARY_ID: 'Inactive'},
  {LIBRARY_VALUE: 'Training Pending', LIBRARY_ID: 'Training Pending'},

]
  blinded_types=[
    {LIBRARY_VALUE: 'Blinded', LIBRARY_ID: 'Blinded'},
    {LIBRARY_VALUE: 'Unblinded', LIBRARY_ID: 'Unblinded'}
  ]
  roles=[]
  depots=[]
  showDialog() {
    this.display = true;
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
  onRowEditInit(product) {
    this.clonedProducts[product.ID] = {...product};
  }

  onRowEditSave(product,index) {
    console.log(product,index)
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    this.spinner.show()
    var sites=product.SITE_ID.toString()
    var obj={
      "SITE_ID": sites,
      "USER_ID": product.USER_ID,
      "ROLE_ID": product.ROLE_ID,
      "USER_TYPE": product.USER_TYPE,
      "STATUS": product.STATUS,
      "STUDY_ID":this.globalID,
	    "USERID" : uid,
      "Action": "UPDATE",
	    "ID": product.ID
    }
    this.userService.addUpdateUser(obj).subscribe(
        (success)=>{
          console.log(success)
          this.user_list=success?.Table
          for(let i=0;i<this.user_list?.length;i++){
            var sites=[]
            var list=[]
            sites=this.user_list[i]?.SITE_ID?.split(",")
            for(let j=0;j<sites?.length;j++){
              let n=Number(sites[j])
              list.push(n)
            }
            let sitenames=[]
            for(let m=0;m<list?.length;m++){
              for(let k=0;k<this.depot_list?.length;k++){
                if(this.depot_list[k].ID==list[m]){
                  sitenames.push(this.depot_list[k].NAME)
                }
              }
            }
            this.user_list[i].sites=sitenames
            this.user_list[i].SITE_ID=list
            for(let k=0;k<this.roles_list?.length;k++){
              if(this.roles_list[k].ID==this.user_list[i].ROLE_ID){
                this.user_list[i].roles=this.roles_list[k].NAME
              }
            }
          }
          this.spinner.hide()
          let sucObj=success.Visit[0]
          if(sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==5){
            this.user_list[index] = this.clonedProducts[product.ID];
            delete this.user_list[product.ID];
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else if(sucObj?.ID==1 || sucObj?.ID==2 ){
            this.user_list[index] = this.clonedProducts[product.ID];
            delete this.user_list[product.ID];
            this.toastr.warning("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.user_list[index] = this.clonedProducts[product.ID];
            delete this.user_list[product.ID];
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
        },
        (error)=>{
          console.log(error)
          this.spinner.hide()
          this.user_list[index] = this.clonedProducts[product.ID];
          delete this.user_list[product.ID];
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )

  }

  onRowEditCancel(product, index: number) {
      this.user_list[index] = this.clonedProducts[product.ID];
      delete this.user_list[product.ID];
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    console.log(columns,this.colum)
    this.user_list.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('user_list.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.user_list.forEach(element => {
      let obj:any={}
      for(let i=0;i<columns.length;i++){
        console.log(element,element[columns[i]])
        obj[this.headers[i]]=element[columns[i]]
        console.log(obj)
      }
      data.push(obj);
    }); 
    const userObject= JSON.parse(localStorage.getItem('currentUser'));

    import("xlsx").then(xlsx => {
      var worksheet = xlsx.utils.aoa_to_sheet([
        ["Generated By :",userObject?.name],
        ['Generated on:',this.datePipe.transform(new Date(),'MMMM d, y, h:mm:ss a')] 

      ]);
      xlsx.utils.sheet_add_json(worksheet, data, {header:this.headers, origin:"A6"});
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: type, type: 'array' });
          this.saveAsExcelFile(excelBuffer, "users",type);
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
  assignUser(){
    this.router.navigate(['study/manageUsers/addOrEditUser'])

  }
}
