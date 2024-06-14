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
import { StudyVisitsService } from '../../services/study-visits.service';
const { jsPDF } = require("jspdf");

@Component({
  selector: 'app-configure-visits',
  templateUrl: './configure-visits.component.html',
  styleUrls: ['./configure-visits.component.css']
})
export class ConfigureVisitsComponent implements OnInit {
  @BlockUI('configureVisits') loader: NgBlockUI;
  title="Kit Types Configuration"
  title1="Kit Types Configuration for "
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private orgService:OrganisationsService,
    private visitService:StudyVisitsService,
    private studyService:StudyServiceService,
  ) { }

  _selectedColumns1: any[];
  cols1 :any= [];
  colum1:any[]=[]
  headers1:any=[]
  visitDetails:any=[]
  globalID
  configureType:FormGroup
  display=false
  kit_types=[]
  treatments=[]
  visit:any
  public breadcrumb: any;
  ngOnInit(): void {
    this.loader.start()
    this.visitDetails=history.state.visitDetails
    this.visit=history.state.obj
    console.log(this.visit)
    this.title1+=this.visit.VISITNAME+'/Randomization'
    console.log(this.visitDetails)
    if(this.visitDetails==undefined || this.visitDetails?.length==0){ 
      this.visitDetails=[]
      // setTimeout(()=>{
      //   this.router.navigate(['study/manageVisit'])
      // },2000)    
    }
    this.configureType = this.formBuilder.group({
      ARM_ID: [null, Validators.required],
      KITTYPE_ID: [null, Validators.required],
      KIT_COUNT: [null, [Validators.required]],
      KIT_MINIMUM:[null, [Validators.required]]
    })
    this.cols1 = [
      { field: 'TREATMENT_NAME', header: 'Treatment Group' },
      { field: 'KIT_TYPE', header: 'Kit Type' },
      { field: 'KIT_COUNT', header: 'Kit Count' },
      { field: 'KIT_MINIMUM', header: 'Minimum Stock Level' }
    ];
    for(let i=0;i<this.cols1.length;i++){
      this.colum1.push(this.cols1[i].field)
      this.headers1.push(this.cols1[i].header)

    }
    this.globalID=this.studyService.globalStudy?.STUDY_ID

    this.visitService.getKitTypeList(this.globalID).subscribe(
      (success)=>{
        console.log(success)
        this.loader.stop()
          if(success.Table1?.length!=0 || success.Table?.length!=0 ){
            this.treatments=success.Table
            this.kit_types=success.Table1

            // this.display=true
          }
          else{
            this.kit_types=[]
            this.treatments=[]
            this.loader.stop()
          }
      },
      (error)=>{
        this.loader.stop()
        console.log(error)
        this.kit_types=[]
        this.treatments=[]
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
    this._selectedColumns1 = this.cols1;
    this.breadcrumb = {
      'mainlabel': this.title1,
      'links': [    
        {
          'name': 'Visits Information',
          'isLink': true,
          'link': '/study/manageVisit'
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
    this.visitDetails.forEach(element => {
      for(let i=0;i<columns.length;i++){
        temp.push(element[columns[i]])
      }
      rows.push(temp);
    });
    doc.autoTable({body:rows,columns:this.headers1})
    doc.save('visitDetails.pdf');
  
  }
  exportExcel1(type) {
    let data=[]
    let columns=[]
    columns=JSON.parse(JSON.stringify(this.colum1));
  
    this.visitDetails.forEach(element => {
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
          this.saveAsExcelFile1(excelBuffer, "visitDetails",type);
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
  edit=false
  editKit
  showDialog(kit){
    if(kit==null){
      this.edit=false
      this.configureType = this.formBuilder.group({
        ARM_ID: [null, Validators.required],
        KITTYPE_ID: [null, Validators.required],
        KIT_COUNT: [null, [Validators.required]],
        KIT_MINIMUM:[null, [Validators.required]]
      })
    }
    else{
      this.edit=true
      this.editKit=kit
      this.configureType = this.formBuilder.group({
        KITTYPE_ID: [kit.KITTYPE_ID, Validators.required],
        ARM_ID: [kit.ARM_ID, Validators.required],
        KIT_COUNT: [kit.KIT_COUNT, [Validators.required]],
        KIT_MINIMUM:[kit.KIT_MINIMUM, [Validators.required]]
      })
    }
    this.display=true
  }
  save(type){
    this.spinner.show()
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    if(this.edit){
      const body={
        "STUDY_ID": this.globalID,
        "VISIT_ID": this.visit.ID,
        "ARM_ID":this.configureType.controls.ARM_ID.value,
        "KIT_COUNT":this.configureType.controls.KIT_COUNT.value,
        "USERID":uid,
        "KITTYPE_ID":this.configureType.controls.KITTYPE_ID.value,
        "KIT_MINIMUM":this.configureType.controls.KIT_MINIMUM.value,
        "ID":this.editKit.ID,
        "ACTION":type
      }
      this.visitService.addUpdateKitTypeConfiguration(body).subscribe(
        (success)=>{
          this.spinner.hide()

          console.log(success)
          let sucObj=success.Visit[0]

          if(sucObj?.ID==3 || sucObj?.ID==4){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.visitDetails=success?.Table1
            // this.submitButton='UPDATE'
            this.display=false
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else {
            this.toastr.warning("", sucObj.Message,{
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
      const body={
        "STUDY_ID": this.globalID,
        "VISIT_ID": this.visit.ID,
        "ARM_ID":this.configureType.controls.ARM_ID.value,
        "KIT_COUNT":this.configureType.controls.KIT_COUNT.value,
        "USERID":uid,
        "KITTYPE_ID":this.configureType.controls.KITTYPE_ID.value,
        "KIT_MINIMUM":this.configureType.controls.KIT_MINIMUM.value,
        "ACTION":type
      }
      this.visitService.addUpdateKitTypeConfiguration(body).subscribe(
        (success)=>{
          this.spinner.hide()
          console.log(success)
          let sucObj=success.Visit[0]
          if(sucObj?.ID==3 || sucObj?.ID==6){
            this.toastr.success("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
            this.visitDetails=success?.Table1
            this.display=false

            // this.submitButton='UPDATE'
          }
          else if(sucObj?.ID==5){
            this.toastr.error("", sucObj.Message,{
              positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
            });
          }
          else {
            this.toastr.warning("", sucObj.Message,{
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
  deleteKit(kit){
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    var type="DELETE"
    const body={
      "ID":kit.ID,
      "STUDY_ID": this.globalID,
      "VISIT_ID": this.visit.ID,
      "ARM_ID":this.configureType.controls.ARM_ID.value,
      "KIT_COUNT":this.configureType.controls.KIT_COUNT.value,
      "USERID":uid,
      "KITTYPE_ID":this.configureType.controls.KITTYPE_ID.value,
      "KIT_MINIMUM":this.configureType.controls.KIT_MINIMUM.value,
      "ACTION":type
    }
    this.visitService.addUpdateKitTypeConfiguration(body).subscribe(
      (success)=>{
        this.spinner.hide()
        let sucObj=success.Visit[0]
        if(sucObj?.ID==3 || sucObj?.ID==6){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
          this.visitDetails=success?.Table1
          this.display=false

          // this.submitButton='UPDATE'
        }
        else if(sucObj?.ID==5){
          this.toastr.error("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
        else {
          this.toastr.warning("", sucObj.Message,{
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
