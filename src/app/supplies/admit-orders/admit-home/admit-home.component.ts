import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyServiceService} from '../../../organization-module/services/study-service.service'
@Component({
  selector: 'app-admit-home',
  templateUrl: './admit-home.component.html',
  styleUrls: ['./admit-home.component.css']
})
export class AdmitHomeComponent implements OnInit {
  @BlockUI('supAdmit') loader: NgBlockUI;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private studyService:StudyServiceService,
  ) { }

  ngOnInit(): void {
  }
  route(route){
    this.router.navigate(['supply/admitOrders/'+ route])
  }
}
