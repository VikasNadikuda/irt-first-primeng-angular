import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService  } from "ngx-toastr";
import {StudyKitService} from '../services/study-kit.service';
import {StudyRoleService} from '../services/study-role.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { StudyServiceService } from 'src/app/organization-module/services/study-service.service';
import {StudyStratificationService} from  '../services/study-stratification.service'
@Component({
  selector: 'app-stratification-factor',
  templateUrl: './stratification-factor.component.html',
  styleUrls: ['./stratification-factor.component.css']
})
export class StratificationFactorComponent implements OnInit {
  @BlockUI('strata') loader: NgBlockUI;
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true ,maxScrollbarLength:240,suppressScrollX:true};

  @ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    public kitService:StudyKitService,
    public strataService:StudyStratificationService,
    public studyService:StudyServiceService
  ) { }
  cohort_list=[]
  addStrata: FormGroup;
  studyDetails
  strata_list=[]
  globalID
  updateStrata=false
  ngOnInit(): void {
    this.studyDetails=this.studyService.globalStudyDetails
    this.globalID=this.studyService.globalStudy.STUDY_ID
    console.log(this.studyDetails)
    this.addStrata = this.formBuilder.group({
      factor:new FormArray([
        this.initStrat()
        // this.addStrat()
      ])
    });
    this.strataService.getAllStrata(this.globalID).subscribe(
      (success)=>{
        this.loader.stop();
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
              this.strata_list=success.Table1
              // this.addStrata.setValue({ "factor": [
              //   { "cohort": 4, "factorName": "Age", "factorValues": [ { "factorValue": "10-20" }, { "factorValue": "20-30" } ] },
              //   { "cohort": 4, "factorName": "Gender", "factorValues": [ { "factorValue": "Male" }, { "factorValue": "Female" } ] } ] })
              this.updateStrata=true
              setTimeout(()=>{
                this.updateFields()
              },1)
          }
          else{
            this.strata_list=[]
          }
          if(this.studyDetails.COHORT!='NO'){
            this.getCohorts()

          }
      },
      (error)=>{
        console.log(error)
        this.loader.stop();
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  updateFields(){
    console.log(this.strata_list)
    this.strata_list.forEach((element,index) => {
      let  val=element?.STRATA_VALUE?.split('$')
      let valObj:any
      let valObjArr=[]
      val.forEach(elem=> {
        valObj={
          'factorValue':elem
        }
        valObjArr.push(valObj)
      });
      let obj={
        'cohort':element.COHORT_ID,
        'factorName':element.STRATA_NAME,
        'factorValues':valObjArr
      }
      console.log(obj,valObjArr)

      console.log(index)
      // ((this.addStrata.get('controls') as FormArray).at(index) as FormGroup).get('description').patchValue(item.description);
      if(index>0){
        this.addStrat() 
        console.log(index)
        let control = <FormArray>this.addStrata.get('factor')['controls'][index]['controls']
        console.log(control)
        control['cohort'].setValue(element.COHORT_ID)
        control['factorName'].setValue(element.STRATA_NAME)
        let valueCon=<FormArray>control['factorValues']
        console.log(valueCon,valObjArr)
        valObjArr.forEach((val,ind) => {
            if(ind>1){
              // console.log('val')
              this.addFactor(index,ind)
            }
        });
        console.log(valueCon)
        valueCon.controls.forEach((e,i)=>{
          console.log(valObjArr[i])
          e.setValue(valObjArr[i])
        })
        // valueCon['controls'][ind]['controls']['factorValue'].setValue(val)

        // valueCon['controls'][ind]['controls']['factorValue'].setValue(val)

        // console.log(valueCon)
        // this.initStratUpdate(element,valObjArr)

        // this.addStrata.setValue({ "factor": [
        //  { "cohort": 4, "factorName": "Gender", "factorValues": [ { "factorValue": "Male" }, { "factorValue": "Female" } ] } ] })
      }
      else{
        console.log(<FormArray>this.addStrata.get('factor')['controls'][index]['controls'])
        let control = <FormArray>this.addStrata.get('factor')['controls'][index]['controls']
        control['cohort'].setValue(element.COHORT_ID)
        control['factorName'].setValue(element.STRATA_NAME)
        let valueCon=<FormArray>control['factorValues']
        valObjArr.forEach((val,ind) => {
          if(ind>1){
            this.addFactor(index,ind)
          }
        });
        valueCon.controls.forEach((e,i)=>{
          console.log(valObjArr[i])
          e.setValue(valObjArr[i])
        })
        // control['factorValues'].setValue(valObjArr)
        // control.push(this.initStratUpdate(element,valObjArr))
        // this.initStratUpdate(element,valObjArr)
      }
      // this.addStrata.setValue({ "factor": [
      //   { "cohort": 4, "factorName": "Gender", "factorValues": [ { "factorValue": "Male" }, { "factorValue": "Female" } ] },
      //   { "cohort": 4, "factorName": "Age", "factorValues": [ { "factorValue": "10-20" }, { "factorValue": "20-30" } ] }
      //   ] })
      // this.addStrata.patchValue({ "factor": [
      //    { "cohort": 4, "factorName": "Gender", "factorValues": [ { "factorValue": "Male" }, { "factorValue": "Female" } ] } ] })
      // let val=element.STRATA_VALUE.split('$')
      // let control = <FormArray>this.addStrata.get('factor');
      // control.push(this.initStrat()); 

    });
  }
  initStratUpdate(obj,values) {
    return new FormGroup({
        cohort:new FormControl(obj.COHORT_ID),
        factorName: new FormControl(obj.STRATA_NAME,Validators.required),
        factorValues: new FormArray(values)

    });
  }

initFactorUpdate(val){
  return new FormGroup({
    factorValue: new FormControl(val,Validators.required)
});
}
  getCohorts(){
    this.strataService.getAllCohort(this.globalID).subscribe(
      (success)=>{
        this.loader.stop();
        console.log(success)
          if(success.Table1!=undefined && success.Table1?.length!=0){
              this.cohort_list=success.Table1
          }
          else{
            this.cohort_list=[]
          }
      },
      (error)=>{
        console.log(error)
        this.loader.stop();
        this.toastr.error("", error.message,{
          positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
        });
      }
    )
  }
  getFactors(form){
    return form.controls.factor.controls 
  }
  getValues(factor){
    return factor.controls.factorValues.controls
    
  }
  initStrat() {
    return new FormGroup({
        cohort:new FormControl(null),
        factorName: new FormControl('',Validators.required),
        factorValues: new FormArray([
          this.initFactor(),
          this.initFactor()
         ])

    });
  }

initFactor(){
  return new FormGroup({
    factorValue: new FormControl('',Validators.required)
});
}
addStrat() {
  let control = <FormArray>this.addStrata.get('factor');
  control.push(this.initStrat()); 
    // const control = < FormArray > this.addStrata.controls['factor'];
    // control.push(this.initStrat());
}
removeStrat(i: number) {
  console.log(<FormArray>this.addStrata.get('factor'))
  const control = <FormArray>this.addStrata.get('factor');
  control.removeAt(i)
    // const control = < FormArray > this.addStrata.controls['factor'];
    // control.removeAt(i);
}
addFactor(i,j) {
  let control = <FormArray>this.addStrata.get('factor')['controls'][i].get('factorValues');;
  control.push(this.initFactor()); 

  // const control = < FormArray > this.addStrata.controls['factorValue'];
  // control.push(this.initStrat());
}
removeFactor(i: number,j) {
  // console.log(i,j, <FormArray>this.addStrata.get('factor')['controls'][i].get('factorValues'))
  let control = <FormArray>this.addStrata.get('factor')['controls'][i].get('factorValues');
  control.removeAt(j)
  // const control = < FormArray > this.addStrata.controls['factorValue'];
  // control.removeAt(i);
}
  ngOnDestroy(){
    this.toastr.clear()
  }
  addUpdate(type){
    console.log(this.addStrata.value)
    this.spinner.show()
    var completeFactors=this.addStrata.value?.factor
    const userObject= JSON.parse(localStorage.getItem('currentUser'));
    const uid=Number(userObject.u_id)
    var orgObject:any={}
    if(this.studyDetails?.COHORT!='No'){
      let arr1=[]
      completeFactors.forEach(element => {
        let obj={}
        let st=''
        let arr=[]
        element.factorValues.forEach(elem => {
          arr.push(elem.factorValue)
        });
        st=arr.join('$')
        obj['Cohort_ID']=element.cohort
        obj['Strata_Name']=element.factorName
        obj['Strata_Value']=st
        obj['STUDY_ID']=this.globalID
        obj['USER_ID']=uid
        obj['Action']=type
        arr1.push(obj)
        
      });
      ///group by cohort
      var groups = completeFactors.reduce(function(obj,item){
        obj[item.cohort] = obj[item.cohort] || [];
        obj[item.cohort].push(item);
        return obj;
    }, {});
    var myArray = Object.keys(groups).map(function(key){
        // console.log(key)
        return {cohort: key, values: groups[key]};
    });
    myArray.forEach(element => {
        if(element?.values.length!=0){
          let c=[]
          let arr=element?.values
          arr.forEach(elem => {
              console.log()
              c.push(elem.factorValue)
          });
          console.log(c)
        }
    });
    console.log(groups,myArray);
    var ob=[]
// console.log(arr)
        myArray.forEach(element => {
        if(element['values'].length!=0){
          let arr=element.values
          // console.log(arr,'hi')
                        let d=[]
                  
          arr.forEach(elem => {
              let c=[]
              // console.log(c)
              let v=elem.factorValues
              v.forEach(e=>{
                  c.push(e.factorValue)

              })
              // console.log(c)
              d.push(c)


          });
          let m=d.reduce((a, b) => a.flatMap(x => b.map(y => x + y+['`'])), [''])
          // console.log(m)
          // console.log(d)
          m.forEach(ele=>{
            // console.log(d)
            let o={
            'Cohort_ID':element.cohort,
            'Strata_Comb':ele.slice(0,-1),
            'STUDY_ID':this.globalID,
            'USER_ID':uid,
            'Action':type
          } 
          ob.push(o)
          })
        }

    });
      orgObject={
        'AddStrataList':arr1,
        'AddStrataCombList':ob
      } 
      console.log(orgObject)
    }
    else{
      let arr1=[]
      completeFactors.forEach(element => {
        let obj={}
        let st=''
        let arr=[]
        element.factorValues.forEach(elem => {
          arr.push(elem.factorValue)
        });
        st=arr.join('$')
        obj['Cohort_ID']=element.cohort
        obj['Strata_Name']=element.factorName
        obj['Strata_Value']=st
        obj['STUDY_ID']=this.globalID
        obj['USER_ID']=uid
        obj['Action']=type
        arr1.push(obj)
        
      });
      ///group by cohort
      var groups = completeFactors.reduce(function(obj,item){
        obj[item.cohort] = obj[item.cohort] || [];
        obj[item.cohort].push(item);
        return obj;
    }, {});
    var myArray = Object.keys(groups).map(function(key){
        // console.log(key)
        return {cohort: key, values: groups[key]};
    });
    myArray.forEach(element => {
        if(element?.values.length!=0){
          let c=[]
          let arr=element?.values
          arr.forEach(elem => {
              console.log()
              c.push(elem.factorValue)
          });
          console.log(c)
        }
    });
    console.log(groups,myArray);
    var ob=[]
      // console.log(arr)
        myArray.forEach(element => {
        if(element['values'].length!=0){
          let arr=element.values
          // console.log(arr,'hi')
                        let d=[]
                  
          arr.forEach(elem => {
              let c=[]
              // console.log(c)
              let v=elem.factorValues
              v.forEach(e=>{
                  c.push(e.factorValue)

              })
              // console.log(c)
              d.push(c)


          });
          let m=d.reduce((a, b) => a.flatMap(x => b.map(y => x + y+['`'])), [''])
          // console.log(m)
          // console.log(d)
          m.forEach(ele=>{
            // console.log(d)
            let o={
            'Cohort_ID':element.cohort,
            'Strata_Comb':ele.slice(0,-1),
            'STUDY_ID':this.globalID,
            'USER_ID':uid,
            'Action':type
          } 
          ob.push(o)
          })
        }

    });
      orgObject={
        'AddStrataList':arr1,
        'AddStrataCombList':ob
      } 
      console.log(ob )
    }
    this.strataService.addUpdateStrata(orgObject).subscribe(
      (success)=>{
        console.log(success)
        this.spinner.hide()
        let sucObj=success.Strata[0]
        if(sucObj?.ID==4 || sucObj?.ID==3){
          this.toastr.success("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
        else if(sucObj?.ID==5){
          this.toastr.error("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
        else if(sucObj?.ID==1 || sucObj?.ID==2 ){
          this.toastr.warning("", sucObj.Message,{
            positionClass:'toast-top-center',   disableTimeOut:true,tapToDismiss:false,closeButton:true
          });
        }
        else{
          this.toastr.error("", sucObj.Message,{
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
