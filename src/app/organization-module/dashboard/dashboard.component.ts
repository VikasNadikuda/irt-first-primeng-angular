import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationServiceService } from "../services/organisation-service.service";
import { FileUpload } from 'primeng/fileupload';
import {LibraryService} from '../../services/library.service'
import * as FileSaver from 'file-saver';
const { jsPDF } = require("jspdf");
import {StudyServiceService} from '../services/study-service.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private dashService:OrganisationServiceService,
    private libraryService:LibraryService,
    private studyService:StudyServiceService,
  ) { }
  depot
  legendPosition='below'
  total_sites:any='NA'
  total_depots:any='NA'
  depot_types:any=[]
  default
  globalID
  ngOnInit(): void {
    this.spinner.show()
    this.globalID=this.studyService.globalStudy?.ORG_ID
    // this.dashService.getDashDetails(this.globalID).subscribe(
      // (success)=>{
        let success={
          "Table": [
              {
                  "name": "Organization Admin",
                  "value": 1,
                  "Active": 1,
                  "Inactive": 1
              },
              {
                  "name": "Study Admin",
                  "value": 1,
                  "Active": 1,
                  "Inactive": 0
              },
              {
                  "name": "User",
                  "value": 1,
                  "Active": 1,
                  "Inactive": 2
              }
          ],
          "Table1": [
              {
                  "username": "Geetha kuroju",
                  "ROLE_NAME": "Organization Admin",
                  "STATUS": "Active"
              },
              {
                  "username": "Shreejani Kuroju",
                  "ROLE_NAME": "Study Admin",
                  "STATUS": "Active"
              },
              {
                  "username": "sdfmksdjkjg jn",
                  "ROLE_NAME": "User",
                  "STATUS": "Active"
              }
          ],
          "Table2": [
              {
                  "ORG_ID": 1,
                  "DEPOT_ID": 2,
                  "KIT_TYPE": "Kit 1",
                  "KIT_ID": 16
              },
              {
                  "ORG_ID": 1,
                  "DEPOT_ID": 2,
                  "KIT_TYPE": "Kit 2",
                  "KIT_ID": 16
              }
          ],
          "Table3": [
              {
                  "SITE_ID": 1,
                  "Column1": "701 - TRS"
              },
              {
                  "SITE_ID": 2,
                  "Column1": "301 - Maxcare"
              },
              {
                  "SITE_ID": 3,
                  "Column1": "401 - Yashoda"
              },
              {
                  "SITE_ID": 6,
                  "Column1": "801 - maxicure"
              }
          ],
          "Table4": [
              {
                  "total_depot": 5,
                  "total_sites": 1
              }
          ]
      }
        if(success.Table!=undefined && success.Table?.length!=0){
          this.single1=success.Table
        }
        else{
          this.single1=[]
          
        }
        if(success.Table1!=undefined && success.Table1?.length!=0){
          this.data=success.Table1
        }
        else{
          this.data=[]
          
        }
        if(success.Table3!=undefined && success.Table3?.length!=0){
          this.depot_types=success.Table3
          var kit_type:any=[]
          if(success.Table2!=undefined && success.Table2?.length!=0){
            kit_type=success.Table2
            for(let i=0;i<this.depot_types.length;i++){
              this.depot_types[i]['kit_types']=[]
              for(let j=0;j<kit_type.length;j++){
                if(kit_type[j]?.DEPOT_ID==this.depot_types[i]?.SITE_ID){
                  let obj={
                    'name':kit_type[j]['KIT_TYPE'],
                    'value':kit_type[j]['KIT_ID']
                  }
                  this.depot_types[i]['kit_types'].push(obj)
                }
              }
            }
          }
          
        }
        else{
          this.depot_types=[]
          
        }
        if(success.Table4!=undefined && success.Table4?.length!=0){
          this.total_depots=success.Table4[0]?.total_depot
          this.total_sites=success.Table4[0]?.total_sites

        }
        else{
          this.total_depots=[]
          this.total_sites=[]

          
        } 
        this.spinner.hide()     
    //   },
    //   (error)=>{
    //     this.spinner.hide()     
    //     console.log(error)
    //     // this.kitDetails=[]
    //     this.toastr.error("", error.message,{
    //       positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
    //     });
    //   }
    // )
    // this.default=this.depot_types[0]
    this.depot=this.depot_types[0]
    this.barChart=this.depot.kit_types
  }
  page=1
  pageSize=3
  length=5
  data:any=[];
  view: any[] = [400, 308];
  hoverObj:any={}
  single1:any= []
single: any[];
multi: any[];
barChart= [];
view1: any[] = [1124, 300];
onSelect1(event) {
  console.log(event);
}
// options
showXAxis = true;
showYAxis = true;
showXAxisLabel=true
showLegend=true 
xAxisLabel='Kit Types'
onSelect(data): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data): void {
  this.single1.forEach(element => {
      if(element.name==data.value.name){
        console.log('1')
        this.hoverObj= element
      }
  });
  // console.log('Activate', JSON.parse(JSON.stringify(data)),this.hoverObj);
}

onDeactivate(data): void {
  // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}
depotChanges(){
  this.barChart=this.depot.kit_types
  console.log(this.depot)

}

}
