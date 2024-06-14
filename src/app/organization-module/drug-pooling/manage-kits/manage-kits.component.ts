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

require('jspdf-autotable');
@Component({
  selector: 'app-manage-kits',
  templateUrl: './manage-kits.component.html',
  styleUrls: ['./manage-kits.component.css']
})
export class ManageKitsComponent implements OnInit {
  @BlockUI('viewKitTypes') loader: NgBlockUI;
  title="Add Kit Type"
  addKitType:FormGroup
  edit=false
  kitOption:string='addKit'
  kits:any=[];
  _selectedColumns: any[];
  cols :any= [];
  colum:any[]=[]
  headers:any=[]
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

  display: boolean = false;

  showDialog() {
      this.display = true;
  }
  inv_types=[
    {LIBRARY_VALUE: 'Bulk', LIBRARY_ID: 'Bulk'},
    {LIBRARY_VALUE: 'Discrete', LIBRARY_ID: 'Discrete'}
  ]
  globalID
  initialValues
  ngOnInit(): void {
    this.loader.start()
    this.globalID=this.studyService.globalStudy?.ORG_ID
    this.cols = [
      { field: 'KIT_TYPE_ID', header: 'Kit ID' },
      { field: 'KIT_TYPE', header: 'Kit Name' },
      { field: 'INVENTORY_TYPE', header: 'Inventory Type' },
      { field: 'CATEGORY', header: 'Category' }

    ];
    for(let i=0;i<this.cols.length;i++){
      this.colum.push(this.cols[i].field)
      this.headers.push(this.cols[i].header)

    }
    this._selectedColumns = this.cols;
    this.addKitType = this.formBuilder.group({
      KitTypeName: ['', [Validators.required,Validators.maxLength(100)]],
      KitTypeId: ['', [Validators.required,Validators.maxLength(100)]],
      Inventory_Type: ['', [Validators.required]],
      Category: ['', [Validators.required,Validators.maxLength(50)]],
      Description: ['', [Validators.required,Validators.maxLength(250)]],

    })
    this.kitService.getKitTypes(this.globalID).subscribe(
      (success)=>{
        this.loader.stop()
          if(success.Table1!=undefined && success.Table1?.length!=0){
            this.kits=success.Table1
          }
          else{
            this.kits=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.kits=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
    this.initialValues=this.addKitType.value
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

  save(type){
    this.spinner.show()
    let obj=this.addKitType.value
    const user_obj= JSON.parse(localStorage.getItem('currentUser'));
    obj.UserID=Number(user_obj.u_id)
    obj.Action=type
    obj.OrgID=this.globalID
    if(this.edit){
      this.kitService.addUpdatekIt(obj).subscribe(
        (success)=>{
          this.spinner.hide()
          if(success.trim()=='Active added successfully.'){
            this.toastr.success("", success,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.toastr.warning("", success,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
    }
    else{
      obj.ID=this.initialValues.ID
      this.kitService.addUpdatekIt(obj).subscribe(
        (success)=>{
          this.spinner.hide()
          if(success.trim()=='Active added successfully.'){
            this.toastr.success("", success,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else{
            this.toastr.warning("", success,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error("", error.message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
      )
    }
  }
  kitEdit
  editKit(kit){
    this.edit=true
    this.title="Edit Kit Type"
    this.display=true
    this.kitEdit=kit
    console.log(kit)
    this.addKitType = this.formBuilder.group({
      KitTypeName: [kit.KIT_TYPE, [Validators.required,Validators.maxLength(100)]],
      KitTypeId: [kit.KIT_TYPE_ID, [Validators.required,Validators.maxLength(100)]],
      Inventory_Type: [kit.INVENTORY_TYPE, [Validators.required]],
      Category: [kit.CATEGORY, [Validators.required,Validators.maxLength(50)]],
      Description: [kit.DESCRIPTION, [Validators.required,Validators.maxLength(250)]],
    })
  }
  close(){
    this.display=false
    this.addKitType.reset(this.initialValues)
  }
  exportPdf() {
    const doc = new jsPDF();
    const rows=[]
    const temp=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
    console.log(columns,this.colum)
    this.kits.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers})
    doc.save('kits.pdf');
  
  }
  exportExcel(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum));
  
    this.kits.forEach(element => {
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
          this.saveAsExcelFile(excelBuffer, "kits",type);
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
