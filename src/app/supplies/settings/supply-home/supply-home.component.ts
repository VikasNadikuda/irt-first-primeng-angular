import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyServiceService} from '../../../organization-module/services/study-service.service'


@Component({
  selector: 'app-supply-home',
  templateUrl: './supply-home.component.html',
  styleUrls: ['./supply-home.component.css']
})
export class SupplyHomeComponent implements OnInit {
  @BlockUI('supSetttings') loader: NgBlockUI;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private studyService:StudyServiceService,

  ) { }
  studyDetails
  ngOnInit(): void {
    this.studyDetails=this.studyService.studyDetails
  }
  route(route){
    this.router.navigate(['supply/settings/'+ route])
  }
}
