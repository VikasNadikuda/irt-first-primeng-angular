import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studies-page',
  templateUrl: './studies-page.component.html',
  styleUrls: ['./studies-page.component.css','./timeline.scss']
})
export class StudiesPageComponent implements OnInit {

  constructor() { }
  study
// ={
//     AUTO_ORDER: "Yes"
// BLINDED_APPROVAL: null
// BLINDED_TYPE: "Open Label"
// COHORT: "Yes"
// COMMIT: 1
// CONTACT_NAME: "Sridhar"
// CREATED_BY: 5
// CREATED_DATE: "2021-11-13T17:41:38.503"
// DESCRIPTION: "desc"
// DRUG_POOLING: "Yes"
// DTP: "Yes"
// FOLLOWUP_DIS: "Yes"
// FORCED_COUNT: null
// FORCED_RAND: "No"
// FORCED_TYPE: null
// ID: 3
// INVENTORY: "Bulk"
// KIT_DESTRUCTION: "No"
// KIT_REPLACEMENT: "Kit Number"
// ORGID: 4
// PHONE_NUMBER: "8790542323"
// PROTOCAL_ID: "Protocol Id - 100"
// SCREENING_ALERT: 90
// SCREENING_CAP: 100
// SHIPMENT_ID: 2
// SITE_AS_FACTOR: 1
// STATUS: "Pending"
// STRATA_FACTOR: "Yes"
// STUDY_CAP: 90
// STUDY_CAP_ALERT: 89
// STUDY_CODE: "Study Code"
// SUBGROUP: "No"
// SUBJECT_LENGTH: 2
// SUBJECT_SEPARATE: "-"
// TREAT_ASSIGN: "Enrollment"
// UPDATED_BY: null
// UPDATED_DATE: "2021-12-24T08:06:19.5"
//   }
  ngOnInit(): void {
    this.study=history.state.studyDetails
    console.log(this.study)
  }


}
